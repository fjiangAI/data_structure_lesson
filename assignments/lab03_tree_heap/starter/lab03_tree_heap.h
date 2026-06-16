#ifndef DS_LAB03_TREE_HEAP_H
#define DS_LAB03_TREE_HEAP_H

#include <stddef.h>

typedef struct {
    int data[16];
    int size;
} MinHeap;

void tree_demo_preorder(char *out, size_t cap);
int avl_demo_root(void);
void heap_init(MinHeap *heap);
int heap_push(MinHeap *heap, int value);
int heap_pop(MinHeap *heap, int *out);

#endif

