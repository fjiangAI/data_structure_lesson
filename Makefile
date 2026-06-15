PYTHON ?= python3

.PHONY: check compile examples test-labs clean

check:
	$(PYTHON) tools/check_course_structure.py
	$(PYTHON) tools/check_links.py
	$(PYTHON) tools/check_encoding.py
	$(PYTHON) tools/check_pages_artifact.py

compile examples:
	$(PYTHON) tools/compile_examples.py --require-compiler

test-labs:
	$(PYTHON) tools/run_lab_tests.py --all --expect-starter-fail

clean:
	rm -rf build verification_screenshots

