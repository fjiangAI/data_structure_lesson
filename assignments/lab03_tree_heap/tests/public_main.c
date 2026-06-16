#include "lab03_tree_heap.h"
#include <stdio.h>

int main(void) {
    char order[64];
    tree_demo_preorder(order, sizeof(order));
    printf("preorder: %s\n", order);
    printf("avl-root: %d\n", avl_demo_root());
    MinHeap heap;
    heap_init(&heap);
    int values[] = {12, 7, 3, 25, 18};
    for (int i = 0; i < 5; ++i) heap_push(&heap, values[i]);
    printf("heap-pop:");
    for (int i = 0; i < 3; ++i) {
        int out = 0;
        heap_pop(&heap, &out);
        printf(" %d", out);
    }
    printf("\n");
    return 0;
}

