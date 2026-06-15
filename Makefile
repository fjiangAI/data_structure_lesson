PYTHON ?= python3

.PHONY: check compile examples clean

check:
	$(PYTHON) tools/check_course_structure.py
	$(PYTHON) tools/check_links.py
	$(PYTHON) tools/check_encoding.py
	$(PYTHON) tools/check_pages_artifact.py

compile examples:
	$(PYTHON) tools/compile_examples.py --require-compiler

clean:
	rm -rf build verification_screenshots

