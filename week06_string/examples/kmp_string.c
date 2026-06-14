/*
 * Week 06 串与模式匹配
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>
#include <string.h>

#define MAX_PATTERN 128


/* 构造 KMP 的 next 数组，记录模式串前缀与后缀可复用的匹配长度。 */
void build_next(const char *pattern, int next[]) {
    int m = (int)strlen(pattern);
    next[0] = 0;
    int len = 0;
    int i = 1;
    while (i < m) {
        if (pattern[i] == pattern[len]) {
            next[i++] = ++len;
        } else if (len > 0) {
            len = next[len - 1];
        } else {
            next[i++] = 0;
        }
    }
}


/* KMP 匹配时文本指针不回退，失配后只根据 next 调整模式串下标。 */
int kmp_search(const char *text, const char *pattern) {
    int n = (int)strlen(text);
    int m = (int)strlen(pattern);
    if (m == 0) return 0;

    int next[MAX_PATTERN];
    build_next(pattern, next);

    int i = 0;
    int j = 0;
    while (i < n) {
        if (text[i] == pattern[j]) {
            ++i;
            ++j;
            if (j == m) return i - j;
        } else if (j > 0) {
            j = next[j - 1];
        } else {
            ++i;
        }
    }
    return -1;
}


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
int main(void) {
    const char *text = "ababcabcacbab";
    const char *pattern = "abcac";
    int next[MAX_PATTERN];
    build_next(pattern, next);

    printf("pattern: %s\nnext: ", pattern);
    for (int i = 0; pattern[i] != '\0'; ++i) {
        printf("%d ", next[i]);
    }
    printf("\nposition = %d\n", kmp_search(text, pattern));
    return 0;
}

