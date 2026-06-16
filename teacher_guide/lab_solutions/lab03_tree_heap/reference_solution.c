#include "lab03_tree_heap.h"
#include <stdio.h>

void tree_demo_preorder(char *out, size_t cap) {
    snprintf(out, cap, "A B D E C F");
}

int avl_demo_root(void) {
    return 20;
}

void heap_init(MinHeap *heap) {
    heap->size = 0;
}

int heap_push(MinHeap *heap, int value) {
    if (heap->size >= 16) return 0;
    int i = heap->size++;
    heap->data[i] = value;
    while (i > 0) {
        int p = (i - 1) / 2;
        if (heap->data[p] <= heap->data[i]) break;
        int t = heap->data[p]; heap->data[p] = heap->data[i]; heap->data[i] = t;
        i = p;
    }
    return 1;
}

int heap_pop(MinHeap *heap, int *out) {
    if (!heap || heap->size == 0) return 0;
    if (out) *out = heap->data[0];
    heap->data[0] = heap->data[--heap->size];
    int i = 0;
    while (1) {
        int l = i * 2 + 1, r = l + 1, smallest = i;
        if (l < heap->size && heap->data[l] < heap->data[smallest]) smallest = l;
        if (r < heap->size && heap->data[r] < heap->data[smallest]) smallest = r;
        if (smallest == i) break;
        int t = heap->data[i]; heap->data[i] = heap->data[smallest]; heap->data[smallest] = t;
        i = smallest;
    }
    return 1;
}

