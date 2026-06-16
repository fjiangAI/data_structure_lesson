#include "lab02_stack_queue_string.h"
#include <string.h>

int brackets_matched(const char *expr) {
    char stack[64];
    int top = 0;
    for (int i = 0; expr && expr[i]; ++i) {
        char ch = expr[i];
        if (ch == '(' || ch == '[' || ch == '{') stack[top++] = ch;
        else if (ch == ')' || ch == ']' || ch == '}') {
            if (top == 0) return 0;
            char left = stack[--top];
            if ((ch == ')' && left != '(') || (ch == ']' && left != '[') || (ch == '}' && left != '{')) return 0;
        }
    }
    return top == 0;
}

void cq_init(CircularQueue *queue) {
    queue->front = 0;
    queue->rear = 0;
}

int cq_enqueue(CircularQueue *queue, int value) {
    int next = (queue->rear + 1) % CQ_CAPACITY;
    if (next == queue->front) return 0;
    queue->data[queue->rear] = value;
    queue->rear = next;
    return 1;
}

int cq_dequeue(CircularQueue *queue, int *out) {
    if (queue->front == queue->rear) return 0;
    if (out) *out = queue->data[queue->front];
    queue->front = (queue->front + 1) % CQ_CAPACITY;
    return 1;
}

int kmp_search(const char *text, const char *pattern) {
    int n = (int)strlen(text);
    int m = (int)strlen(pattern);
    if (m == 0) return 0;
    int next[64] = {0};
    for (int i = 1, j = 0; i < m; ++i) {
        while (j > 0 && pattern[i] != pattern[j]) j = next[j - 1];
        if (pattern[i] == pattern[j]) ++j;
        next[i] = j;
    }
    for (int i = 0, j = 0; i < n; ++i) {
        while (j > 0 && text[i] != pattern[j]) j = next[j - 1];
        if (text[i] == pattern[j]) ++j;
        if (j == m) return i - m + 1;
    }
    return -1;
}

