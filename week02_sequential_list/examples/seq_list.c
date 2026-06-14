#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    int size;
    int capacity;
} SeqList;

int init_list(SeqList *list, int capacity) {
    list->data = (int *)malloc(sizeof(int) * capacity);
    if (!list->data) return 0;
    list->size = 0;
    list->capacity = capacity;
    return 1;
}

void destroy_list(SeqList *list) {
    free(list->data);
    list->data = NULL;
    list->size = 0;
    list->capacity = 0;
}

int reserve(SeqList *list, int new_capacity) {
    if (new_capacity <= list->capacity) return 1;
    int *new_data = (int *)realloc(list->data, sizeof(int) * new_capacity);
    if (!new_data) return 0;
    list->data = new_data;
    list->capacity = new_capacity;
    return 1;
}

int insert_at(SeqList *list, int index, int value) {
    if (index < 0 || index > list->size) return 0;
    if (list->size == list->capacity) {
        int next_capacity = list->capacity == 0 ? 4 : list->capacity * 2;
        if (!reserve(list, next_capacity)) return 0;
    }
    for (int i = list->size; i > index; --i) {
        list->data[i] = list->data[i - 1];
    }
    list->data[index] = value;
    ++list->size;
    return 1;
}

int erase_at(SeqList *list, int index) {
    if (index < 0 || index >= list->size) return 0;
    for (int i = index; i < list->size - 1; ++i) {
        list->data[i] = list->data[i + 1];
    }
    --list->size;
    return 1;
}

int find_value(const SeqList *list, int value) {
    for (int i = 0; i < list->size; ++i) {
        if (list->data[i] == value) return i;
    }
    return -1;
}

void print_list(const SeqList *list) {
    printf("[");
    for (int i = 0; i < list->size; ++i) {
        printf("%d%s", list->data[i], i + 1 == list->size ? "" : ", ");
    }
    printf("] size=%d capacity=%d\n", list->size, list->capacity);
}

int main(void) {
    SeqList list;
    if (!init_list(&list, 2)) return 1;

    insert_at(&list, 0, 10);
    insert_at(&list, 1, 30);
    insert_at(&list, 1, 20);
    insert_at(&list, 3, 40);
    print_list(&list);

    printf("find 30 -> %d\n", find_value(&list, 30));
    erase_at(&list, 1);
    print_list(&list);

    destroy_list(&list);
    return 0;
}

