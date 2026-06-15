import base64
import functools
import http.server
import json
import os
import shutil
import subprocess
import tempfile
import threading
import time
import urllib.parse
import urllib.request
from pathlib import Path

import websocket


ROOT = Path(__file__).resolve().parents[1]
EDGE = Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")
PORT = 9223


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def handle(self):
        try:
            super().handle()
        except (BrokenPipeError, ConnectionAbortedError, ConnectionResetError):
            return

    def copyfile(self, source, outputfile):
        try:
            super().copyfile(source, outputfile)
        except (BrokenPipeError, ConnectionAbortedError, ConnectionResetError):
            return

    def log_message(self, format, *args):
        return


def wait_json(url, timeout=10, method="GET"):
    deadline = time.time() + timeout
    last_error = None
    while time.time() < deadline:
        try:
            request = urllib.request.Request(url, method=method)
            with urllib.request.urlopen(request, timeout=1) as response:
                return json.loads(response.read().decode("utf-8"))
        except Exception as exc:
            last_error = exc
            time.sleep(0.2)
    raise RuntimeError(f"Timed out waiting for {url}: {last_error}")


class Cdp:
    def __init__(self, ws_url):
        self.ws = websocket.create_connection(ws_url, timeout=10)
        self.next_id = 1

    def call(self, method, params=None):
        msg_id = self.next_id
        self.next_id += 1
        self.ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
        while True:
            message = json.loads(self.ws.recv())
            if message.get("id") == msg_id:
                if "error" in message:
                    raise RuntimeError(f"{method} failed: {message['error']}")
                return message.get("result", {})

    def close(self):
        self.ws.close()


def new_tab(url):
    encoded = urllib.parse.quote(url, safe=":/?&=%")
    data = wait_json(f"http://127.0.0.1:{PORT}/json/new?{encoded}", method="PUT")
    return Cdp(data["webSocketDebuggerUrl"])


def start_site_server():
    handler = functools.partial(QuietHandler, directory=str(ROOT))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server, server.server_address[1]


def page_url(rel_path, site_port):
    safe_rel = str(rel_path).replace("\\", "/")
    return f"http://127.0.0.1:{site_port}/" + urllib.parse.quote(safe_rel, safe="/:?&=%#.")


def verify_page(rel_path, screenshot_name, site_port):
    url = page_url(rel_path, site_port)
    page = new_tab(url)
    try:
        page.call("Runtime.enable")
        page.call("Page.enable")
        page.call("Page.navigate", {"url": url})
        time.sleep(2)

        result = page.call(
            "Runtime.evaluate",
            {
                "returnByValue": True,
                "expression": """
(() => {
  const visible = (selector) => Array.from(document.querySelectorAll(selector)).filter(el => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }).length;
  const next = document.querySelector('#nextStep') || document.querySelector('#labNext');
  if (next) {
    next.click();
    next.click();
  }
  return {
    title: document.title,
    hasDemo: !!document.querySelector('#visualCanvas, #labCanvas, #weekGrid, #docContent'),
    readerLoaded: !!document.querySelector('#docContent') && !document.querySelector('#docContent .loading'),
    visualItems: visible('.viz-cell, .viz-node, .viz-token, .viz-bucket, .viz-count, .viz-block, .viz-bar, .svg-node, .week-card'),
    activeItems: visible('.is-active, .viz-active, .svg-node.active'),
    stepText: (document.querySelector('#stepText, #labExplain') || {}).textContent || '',
    cards: document.querySelectorAll('.week-card').length,
    bodyLength: document.body.innerText.length
  };
})()
""",
            },
        )["result"]["value"]

        if not result["hasDemo"]:
            raise AssertionError(f"{rel_path} did not render a demo container: {result}")
        if result["visualItems"] < 2 and not result["readerLoaded"]:
            raise AssertionError(f"{rel_path} rendered too few visual items: {result}")
        if result["bodyLength"] < 200:
            raise AssertionError(f"{rel_path} page text is unexpectedly short: {result}")

        page.call(
            "Runtime.evaluate",
            {
                "expression": """
(() => {
  const target = document.querySelector('#visualCanvas, #labCanvas, #weekGrid, #docContent');
  if (target) target.scrollIntoView({ block: 'center' });
})()
""",
            },
        )
        time.sleep(0.3)
        png = page.call("Page.captureScreenshot", {"format": "png", "captureBeyondViewport": False})["data"]
        out_dir = ROOT / "verification_screenshots"
        out_dir.mkdir(exist_ok=True)
        (out_dir / screenshot_name).write_bytes(base64.b64decode(png))
        return result
    finally:
        page.close()


def main():
    if not EDGE.exists():
        raise RuntimeError(f"Microsoft Edge not found at {EDGE}")

    site_server, site_port = start_site_server()
    user_data = Path(tempfile.mkdtemp(prefix="ds-course-edge-"))
    proc = subprocess.Popen(
        [
            str(EDGE),
            "--headless=new",
            f"--remote-debugging-port={PORT}",
            f"--user-data-dir={user_data}",
            "--disable-gpu",
            "--no-first-run",
            "--disable-extensions",
            "--remote-allow-origins=*",
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        wait_json(f"http://127.0.0.1:{PORT}/json/version")
        pages = [
            ("onlineweb/index.html", "onlineweb.png"),
            ("onlineweb/viewer.html?src=../README.md", "viewer-readme.png"),
            ("onlineweb/viewer.html?src=../week02_sequential_list/lecture.md", "viewer-lecture.png"),
            ("onlineweb/viewer.html?src=../week02_sequential_list/examples/seq_list.c", "viewer-code.png"),
            ("onlineweb/viewer.html?src=../week02_sequential_list/exercises.md", "viewer-exercises.png"),
        ]
        for week_dir in sorted(ROOT.glob("week*")):
            rel = f"{week_dir.name}/interactive.html"
            pages.append((rel, f"{week_dir.name}.png"))
        results = {rel: verify_page(rel, shot, site_port) for rel, shot in pages}
        print(json.dumps(results, ensure_ascii=False, indent=2))
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
        site_server.shutdown()
        site_server.server_close()
        shutil.rmtree(user_data, ignore_errors=True)


if __name__ == "__main__":
    main()
