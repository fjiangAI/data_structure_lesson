#include "lab01_linear_list.h"
#include <stdlib.h>

void seq_init(SeqList *list, int capacity) {
    /* TODO: initialize size, capacity, and storage invariant. */
    (void)list;
    (void)capacity;
}

int seq_insert(SeqList *list, int index, int value) {
    /* TODO: check boundary and move suffix from back to front. */
    (void)list;
    (void)index;
    (void)value;
    return 0;
}

int seq_erase(SeqList *list, int index) {
    /* TODO: check boundary and move suffix left. */
    (void)list;
    (void)index;
    return 0;
}

int seq_find(const SeqList *list, int value) {
    /* TODO: return first matched index, or -1 when not found. */
    (void)list;
    (void)value;
    return -1;
}

void list_push_front(ListNode **head, int value) {
    /* TODO: allocate a node and link it before current head. */
    (void)head;
    (void)value;
}

int list_find(const ListNode *head, int value) {
    /* TODO: walk next pointers. */
    (void)head;
    (void)value;
    return 0;
}

int list_delete_value(ListNode **head, int value) {
    /* TODO: unlink the first matched node and free it. */
    (void)head;
    (void)value;
    return 0;
}

void list_clear(ListNode **head) {
    /* TODO: release every node and set *head to NULL. */
    (void)head;
}

