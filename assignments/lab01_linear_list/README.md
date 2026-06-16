# Lab 01 线性表实现与对比 ADT Starter

本文件夹提供接口型 C 语言实验骨架。学生应实现 ADT 操作函数，而不是把结果直接写死到 `main` 中。

## 文件

- `starter/lab01_linear_list.h`：本 Lab 的公开接口。除非教师另有要求，不建议修改函数签名。
- `starter/lab01_linear_list.c`：待补全实现文件。学生主要修改这个文件。
- `tests/public_main.c`：public test 入口，直接调用 ADT 接口。
- `expected_output.txt`：public test 的期望输出。
- `tests/test_lab.py`：编译 `lab01_linear_list.c` 与 `public_main.c`，并比较输出。

## 运行

```bash
cd assignments/lab01_linear_list
python3 tests/test_lab.py
```

初始 starter 通常不会通过测试。你需要补全 `starter/lab01_linear_list.c` 中的 TODO，并保证 public test 输出与 `expected_output.txt` 一致。

也可以测试另一份实现文件：

```bash
python3 tests/test_lab.py --source path/to/your_lab01_linear_list.c
```

## 学习重点

- 先解释结构体字段如何维护数据关系，再写操作函数。
- 每个操作都要说明成功、失败和边界输入。
- public test 只覆盖基本路径，正式批改会增加 hidden tests。
- 可以使用 LLM 辅助生成测试，但必须人工核查不变量和复杂度。

