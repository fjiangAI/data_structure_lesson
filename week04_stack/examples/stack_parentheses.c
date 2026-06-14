/*
 * Week 04 受限线性表之一：栈
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>
#include <string.h>

#define MAX_STACK 128


/* 结构体定义：把抽象数据类型落实为 C 语言中的字段。 */
typedef struct {
    char data[MAX_STACK];
    int top;
} CharStack;


/* 初始化栈顶位置。这里 top=-1 表示空栈。 */
void init_stack(CharStack *s) {
    s->top = -1;
}


/* 判断结构是否为空，很多操作都要先走这个边界检查。 */
int is_empty(const CharStack *s) {
    return s->top == -1;
}


/* 入栈只改变栈顶一端；先检查容量，再移动 top 并写入元素。 */
int push(CharStack *s, char ch) {
    if (s->top + 1 >= MAX_STACK) return 0;
    s->data[++s->top] = ch;
    return 1;
}


/* 出栈只从栈顶删除；先判断空栈，再返回栈顶元素并移动 top。 */
int pop(CharStack *s, char *out) {
    if (is_empty(s)) return 0;
    *out = s->data[s->top--];
    return 1;
}


/* 把括号配对规则集中到一个函数中，主算法只关心入栈和出栈。 */
int match_pair(char left, char right) {
    return (left == '(' && right == ')') ||
           (left == '[' && right == ']') ||
           (left == '{' && right == '}');
}


/* 括号匹配的核心：左括号入栈，右括号必须匹配最近的左括号。 */
int is_matched(const char *text) {
    CharStack s;
    init_stack(&s);

    for (int i = 0; text[i] != '\0'; ++i) {
        char ch = text[i];
        if (ch == '(' || ch == '[' || ch == '{') {
            if (!push(&s, ch)) return 0;
        } else if (ch == ')' || ch == ']' || ch == '}') {
            char left;
            if (!pop(&s, &left) || !match_pair(left, ch)) {
                return 0;
            }
        }
    }
    return is_empty(&s);
}


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
int main(void) {
    const char *cases[] = {
        "a[(b+c)*d]",
        "{[()()]}",
        "([)]",
        "((missing)"
    };
    int n = (int)(sizeof(cases) / sizeof(cases[0]));
    for (int i = 0; i < n; ++i) {
        printf("%s -> %s\n", cases[i], is_matched(cases[i]) ? "matched" : "invalid");
    }
    return 0;
}

