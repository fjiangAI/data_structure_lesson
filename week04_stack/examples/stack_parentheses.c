#include <stdio.h>
#include <string.h>

#define MAX_STACK 128

typedef struct {
    char data[MAX_STACK];
    int top;
} CharStack;

void init_stack(CharStack *s) {
    s->top = -1;
}

int is_empty(const CharStack *s) {
    return s->top == -1;
}

int push(CharStack *s, char ch) {
    if (s->top + 1 >= MAX_STACK) return 0;
    s->data[++s->top] = ch;
    return 1;
}

int pop(CharStack *s, char *out) {
    if (is_empty(s)) return 0;
    *out = s->data[s->top--];
    return 1;
}

int match_pair(char left, char right) {
    return (left == '(' && right == ')') ||
           (left == '[' && right == ']') ||
           (left == '{' && right == '}');
}

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

