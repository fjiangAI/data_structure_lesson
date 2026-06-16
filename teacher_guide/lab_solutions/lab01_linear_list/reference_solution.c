#include "lab01_linear_list.h"
#include <stdlib.h>

void seq_init(SeqList *list, int capacity) {
    list->size = 0;
    list->capacity = capacity < 16 ? capacity : 16;
}

int seq_insert(SeqList *list, int index, int value) {
    if (!list || index < 0 || index > list->size || list->size >= list->capacity) return 0;
    for (int i = list->size; i > index; --i) list->data[i] = list->data[i - 1];
    list->data[index] = value;
    list->size += 1;
    return 1;
}

int seq_erase(SeqList *list, int index) {
    if (!list || index < 0 || index >= list->size) return 0;
    for (int i = index; i + 1 < list->size; ++i) list->data[i] = list->data[i + 1];
    list->size -= 1;
    return 1;
}

int seq_find(const SeqList *list, int value) {
    if (!list) return -1;
    for (int i = 0; i < list->size; ++i) if (list->data[i] == value) return i;
    return -1;
}

void list_push_front(ListNode **head, int value) {
    ListNode *node = (ListNode *)malloc(sizeof(ListNode));
    if (!node) return;
    node->value = value;
    node->next = *head;
    *head = node;
}

int list_find(const ListNode *head, int value) {
    for (const ListNode *p = head; p; p = p->next) if (p->value == value) return 1;
    return 0;
}

int list_delete_value(ListNode **head, int value) {
    ListNode **link = head;
    while (*link) {
        if ((*link)->value == value) {
            ListNode *victim = *link;
            *link = victim->next;
            free(victim);
            return 1;
        }
        link = &(*link)->next;
    }
    return 0;
}

void list_clear(ListNode **head) {
    while (head && *head) {
        ListNode *next = (*head)->next;
        free(*head);
        *head = next;
    }
}

