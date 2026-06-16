#ifndef DS_LAB01_LINEAR_LIST_H
#define DS_LAB01_LINEAR_LIST_H

typedef struct {
    int data[16];
    int size;
    int capacity;
} SeqList;

typedef struct ListNode {
    int value;
    struct ListNode *next;
} ListNode;

void seq_init(SeqList *list, int capacity);
int seq_insert(SeqList *list, int index, int value);
int seq_erase(SeqList *list, int index);
int seq_find(const SeqList *list, int value);
void list_push_front(ListNode **head, int value);
int list_find(const ListNode *head, int value);
int list_delete_value(ListNode **head, int value);
void list_clear(ListNode **head);

#endif

