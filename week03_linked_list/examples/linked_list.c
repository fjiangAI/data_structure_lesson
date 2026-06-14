#include <stdio.h>
#include <stdlib.h>

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

int erase_value(Node *head, int value) {
    Node *prev = find_prev(head, value);
    if (!prev) return 0;
    Node *target = prev->next;
    prev->next = target->next;
    free(target);
    return 1;
}

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

void print_list(const Node *head) {
    const Node *p = head->next;
    printf("head");
    while (p) {
        printf(" -> %d", p->data);
        p = p->next;
    }
    printf(" -> NULL\n");
}

void destroy(Node *head) {
    Node *p = head;
    while (p) {
        Node *next = p->next;
        free(p);
        p = next;
    }
}

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

