PYTHON ?= python3

.PHONY: check compile examples clean

check:
	$(PYTHON) tools/check_course_structure.py

compile examples:
	$(PYTHON) tools/compile_examples.py --require-compiler

clean:
	rm -rf build verification_screenshots

