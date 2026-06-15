/*
 * Week 05 受限线性表之二：队列
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>

#define CAPACITY 8


/* 结构体定义：把抽象数据类型落实为 C 语言中的字段。 */
typedef struct {
    int data[CAPACITY];
    int front;
    int rear;
} Queue;


/* 循环队列初始化时 front 和 rear 指向同一位置，表示队空。 */
void init_queue(Queue *q) {
    q->front = 0;
    q->rear = 0;
}


/* 判断结构是否为空，很多操作都要先走这个边界检查。 */
int is_empty(const Queue *q) {
    return q->front == q->rear;
}


/* 牺牲一个数组单元后，rear 的下一个位置等于 front 表示队满。 */
int is_full(const Queue *q) {
    return (q->rear + 1) % CAPACITY == q->front;
}


/* 入队在 rear 写入，然后 rear 取模后移，避免普通数组队列的整体搬移。 */
int enqueue(Queue *q, int value) {
    if (is_full(q)) return 0;
    q->data[q->rear] = value;
    q->rear = (q->rear + 1) % CAPACITY;
    return 1;
}


/* 出队在 front 读取，然后 front 取模后移，操作代价为 O(1)。 */
int dequeue(Queue *q, int *out) {
    if (is_empty(q)) return 0;
    *out = q->data[q->front];
    q->front = (q->front + 1) % CAPACITY;
    return 1;
}


/* 按循环下标从 front 走到 rear，显示队列的逻辑顺序。 */
void print_queue(const Queue *q) {
    printf("front=%d rear=%d |", q->front, q->rear);
    int i = q->front;
    while (i != q->rear) {
        printf(" %d", q->data[i]);
        i = (i + 1) % CAPACITY;
    }
    printf("\n");
}


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
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

