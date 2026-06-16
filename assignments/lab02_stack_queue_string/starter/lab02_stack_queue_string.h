#ifndef DS_LAB02_STACK_QUEUE_STRING_H
#define DS_LAB02_STACK_QUEUE_STRING_H

#define CQ_CAPACITY 8

typedef struct {
    int data[CQ_CAPACITY];
    int front;
    int rear;
} CircularQueue;

int brackets_matched(const char *expr);
void cq_init(CircularQueue *queue);
int cq_enqueue(CircularQueue *queue, int value);
int cq_dequeue(CircularQueue *queue, int *out);
int kmp_search(const char *text, const char *pattern);

#endif

