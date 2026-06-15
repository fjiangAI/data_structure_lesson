# Lab 测试与批改指南

本文件说明如何使用每个 Lab 自带的 public test，以及如何为助教批改扩展 hidden tests。

## 学生本地运行

进入某个 Lab 文件夹后运行：

```bash
python3 tests/test_lab.py
```

如果要测试另一份源码：

```bash
python3 tests/test_lab.py --source ../../submissions/student01/lab01.c
```

测试脚本会：

1. 用 `gcc -std=c11 -Wall -Wextra` 编译源码。
2. 运行生成的程序。
3. 将标准输出与 `expected_output.txt` 精确比较。

## 教师统一检查

仓库提供统一运行器：

```bash
python3 tools/run_lab_tests.py --lab lab01 --expect-starter-fail
python3 tools/run_lab_tests.py --all --expect-starter-fail
```

`--expect-starter-fail` 用于检查 starter 是否能被测试框架识别。starter 默认没有实现 TODO，因此测试不通过是正常状态。

如果测试学生提交，可传入源码根目录。运行器会尝试寻找与 Lab 对应的 C 文件：

```bash
python3 tools/run_lab_tests.py --all --source-root submissions/student01
```

## Hidden tests 建议

Public test 只检查最小可运行结果。正式批改建议增加 hidden tests：

- 空结构：空表删除、空栈 pop、空队列 dequeue。
- 边界容量：数组满、循环队列回绕、哈希表高装载因子。
- 重复关键字：排序稳定性、BST 重复插入策略。
- 极端输入：已排序数组、逆序数组、非连通图、不可达路径。
- 资源检查：动态内存释放、失败返回值是否被调用者处理。

Hidden tests 不建议放在公开仓库中，可复制每个 Lab 的 `tests/test_lab.py` 后替换输入和期望输出。

