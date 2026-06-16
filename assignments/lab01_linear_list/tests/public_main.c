#include "lab01_linear_list.h"
#include <stdio.h>

static void print_seq(const SeqList *list) {
    printf("seq:");
    for (int i = 0; i < list->size; ++i) printf(" %d", list->data[i]);
    printf("\n");
}

static void print_list(const ListNode *head) {
    printf("list:");
    for (const ListNode *p = head; p; p = p->next) printf(" %d", p->value);
    printf("\n");
}

int main(void) {
    SeqList seq;
    seq_init(&seq, 8);
    seq_insert(&seq, 0, 10);
    seq_insert(&seq, 1, 20);
    seq_insert(&seq, 2, 30);
    seq_insert(&seq, 2, 25);
    print_seq(&seq);

    ListNode *head = 0;
    list_push_front(&head, 10);
    list_push_front(&head, 20);
    list_push_front(&head, 25);
    list_push_front(&head, 30);
    print_list(head);
    printf("find 25: %s\n", seq_find(&seq, 25) >= 0 && list_find(head, 25) ? "yes" : "no");
    list_clear(&head);
    return 0;
}

