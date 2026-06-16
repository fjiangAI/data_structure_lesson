PYTHON ?= python3

.PHONY: check compile examples test-labs test-references sanitize clean

check:
	$(PYTHON) tools/check_course_structure.py
	$(PYTHON) tools/check_links.py
	$(PYTHON) tools/check_encoding.py
	$(PYTHON) tools/check_pages_artifact.py

compile examples:
	$(PYTHON) tools/compile_examples.py --require-compiler

test-labs:
	$(PYTHON) tools/run_lab_tests.py --all --expect-starter-fail

test-references:
	$(PYTHON) tools/run_reference_solutions.py

sanitize:
	$(PYTHON) tools/sanitize_examples.py

clean:
	rm -rf build verification_screenshots assignments/lab*/build

