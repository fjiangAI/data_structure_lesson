#include <stdio.h>

#define CAPACITY 8

typedef struct {
    int data[CAPACITY];
    int front;
    int rear;
} Queue;

void init_queue(Queue *q) {
    q->front = 0;
    q->rear = 0;
}

int is_empty(const Queue *q) {
    return q->front == q->rear;
}

int is_full(const Queue *q) {
    return (q->rear + 1) % CAPACITY == q->front;
}

int enqueue(Queue *q, int value) {
    if (is_full(q)) return 0;
    q->data[q->rear] = value;
    q->rear = (q->rear + 1) % CAPACITY;
    return 1;
}

int dequeue(Queue *q, int *out) {
    if (is_empty(q)) return 0;
    *out = q->data[q->front];
    q->front = (q->front + 1) % CAPACITY;
    return 1;
}

void print_queue(const Queue *q) {
    printf("front=%d rear=%d |", q->front, q->rear);
    int i = q->front;
    while (i != q->rear) {
        printf(" %d", q->data[i]);
        i = (i + 1) % CAPACITY;
    }
    printf("\n");
}

int main(void) {
    Queue q;
    init_queue(&q);
    for (int i = 1; i <= 6; ++i) {
        enqueue(&q, i * 10);
    }
    print_queue(&q);

    int value;
    dequeue(&q, &value);
    dequeue(&q, &value);
    print_queue(&q);

    enqueue(&q, 70);
    enqueue(&q, 80);
    print_queue(&q);
    return 0;
}

