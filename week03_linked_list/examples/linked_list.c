/*
 * Week 03 线性表之二：链表
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>
#include <stdlib.h>


/* 结构体定义：把抽象数据类型落实为 C 语言中的字段。 */
typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node *create_node(int value) {
    Node *node = (Node *)malloc(sizeof(Node));
    if (!node) return NULL;
    node->data = value;
    node->next = NULL;
    return node;
}

Node *create_head(void) {
    return create_node(0);
}


/* 已知前驱结点时插入是 O(1)：先让新结点接上后继，再让前驱指向新结点。 */
int insert_after(Node *prev, int value) {
    if (!prev) return 0;
    Node *node = create_node(value);
    if (!node) return 0;
    node->next = prev->next;
    prev->next = node;
    return 1;
}

Node *find_prev(Node *head, int value) {
    Node *p = head;
    while (p && p->next) {
        if (p->next->data == value) return p;
        p = p->next;
    }
    return NULL;
}


/* 删除结点时要先改前驱指针，再释放目标结点，避免链表断裂和内存泄漏。 */
int erase_value(Node *head, int value) {
    Node *prev = find_prev(head, value);
    if (!prev) return 0;
    Node *target = prev->next;
    prev->next = target->next;
    free(target);
    return 1;
}


/* 链表逆置逐个改变 next 方向，需要同时保存 prev、cur 和 next 三个位置。 */
void reverse(Node *head) {
    Node *prev = NULL;
    Node *cur = head->next;
    while (cur) {
        Node *next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }
    head->next = prev;
}


/* 输出函数用于观察结构状态，调试数据结构时要同时看元素、size 和 capacity。 */
void print_list(const Node *head) {
    const Node *p = head->next;
    printf("head");
    while (p) {
        printf(" -> %d", p->data);
        p = p->next;
    }
    printf(" -> NULL\n");
}


/* 释放结构中的动态结点；释放前要保证仍能访问到尚未释放的部分。 */
void destroy(Node *head) {
    Node *p = head;
    while (p) {
        Node *next = p->next;
        free(p);
        p = next;
    }
}


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
int main(void) {
    Node *head = create_head();
    insert_after(head, 30);
    insert_after(head, 20);
    insert_after(head, 10);
    print_list(head);

    erase_value(head, 20);
    print_list(head);

    reverse(head);
    print_list(head);

    destroy(head);
    return 0;
}

