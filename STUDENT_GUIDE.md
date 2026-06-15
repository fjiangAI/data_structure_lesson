# 学生快速入门

本项目是《数据结构 C 语言版》的课程网站和学习资料库。你可以把它当作每周预习、课堂演示、课后练习和实验作业的统一入口。

## 如何开始

1. 打开 `onlineweb/index.html` 或 GitHub Pages 地址。
2. 按周次进入课程，先看讲义，再看交互演示。
3. 阅读 `examples/*.c`，重点看结构体字段和核心操作函数。
4. 完成 `exercises.md`，再对照 `answers.md` 自查。
5. 阶段实验见 `assignments/`。

## 如何编译 C 示例

如果你安装了 gcc：

```bash
gcc -std=c11 -Wall -Wextra week02_sequential_list/examples/seq_list.c -o seq_list
./seq_list
```

也可以使用课程脚本一次性编译全部示例：

```bash
python3 tools/compile_examples.py --require-compiler
```

Windows 用户如果暂时没有 gcc，可以使用 VS Code Dev Containers，或安装 MinGW-w64 / MSYS2。

## 作业提交建议

每次实验至少提交：

- 源代码。
- 编译命令。
- 运行结果或测试截图。
- 边界测试说明。
- 复杂度分析。
- AI 使用记录。

## 常见问题

### 中文注释乱码

本仓库的 C 文件使用 UTF-8 BOM，并提供 `.editorconfig`。如果仍乱码，请确认编辑器按 UTF-8 打开。

### 本机没有 C 编译器

可以使用 `.devcontainer/`，或在 Linux/macOS 上安装 `gcc`，在 Windows 上安装 MSYS2/MinGW-w64。

### 可以用 AI 写作业吗

可以用 AI 解释、生成测试、帮助定位问题，但最终代码和解释必须由你理解并验证。具体要求见 [AI_LEARNING_GUIDE.md](AI_LEARNING_GUIDE.md)。

