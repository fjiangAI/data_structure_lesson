FROM ubuntu:24.04

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential python3 make \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /course
COPY . /course

CMD ["bash", "-lc", "python3 tools/check_course_structure.py && python3 tools/compile_examples.py --require-compiler"]

