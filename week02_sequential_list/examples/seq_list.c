/*
 * Week 02 线性表之一：顺序表
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>
#include <stdlib.h>


/* 结构体定义：把抽象数据类型落实为 C 语言中的字段。 */
typedef struct {
    int *data;
    int size;
    int capacity;
} SeqList;


/* 建立顺序表的合法空状态：申请连续空间，并把 size 与 capacity 分开维护。 */
int init_list(SeqList *list, int capacity) {
    list->data = (int *)malloc(sizeof(int) * capacity);
    if (!list->data) return 0;
    list->size = 0;
    list->capacity = capacity;
    return 1;
}


/* 释放顺序表持有的动态内存，并把字段清空，避免悬空指针被继续使用。 */
void destroy_list(SeqList *list) {
    free(list->data);
    list->data = NULL;
    list->size = 0;
    list->capacity = 0;
}


/* 扩容只改变物理容量，不改变逻辑长度；realloc 成功后原元素仍按原顺序保存。 */
int reserve(SeqList *list, int new_capacity) {
    if (new_capacity <= list->capacity) return 1;
    int *new_data = (int *)realloc(list->data, sizeof(int) * new_capacity);
    if (!new_data) return 0;
    list->data = new_data;
    list->capacity = new_capacity;
    return 1;
}


/* 顺序表插入的核心：先保证容量，再从后向前搬移元素，最后写入新值。 */
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


/* 顺序表删除的核心：目标之后的元素整体前移，逻辑长度减一。 */
int erase_at(SeqList *list, int index) {
    if (index < 0 || index >= list->size) return 0;
    for (int i = index; i < list->size - 1; ++i) {
        list->data[i] = list->data[i + 1];
    }
    --list->size;
    return 1;
}


/* 按值查找只能顺序比较；顺序表的 O(1) 随机访问不等于 O(1) 按值查找。 */
int find_value(const SeqList *list, int value) {
    for (int i = 0; i < list->size; ++i) {
        if (list->data[i] == value) return i;
    }
    return -1;
}


/* 输出函数用于观察结构状态，调试数据结构时要同时看元素、size 和 capacity。 */
void print_list(const SeqList *list) {
    printf("[");
    for (int i = 0; i < list->size; ++i) {
        printf("%d%s", list->data[i], i + 1 == list->size ? "" : ", ");
    }
    printf("] size=%d capacity=%d\n", list->size, list->capacity);
}


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
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

