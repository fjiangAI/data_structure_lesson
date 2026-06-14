#include <stdio.h>
#include <string.h>

#define MAX_PATTERN 128

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

