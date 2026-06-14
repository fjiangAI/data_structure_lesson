#include <stdio.h>

#define MAX_HEAP 64

typedef struct {
    int data[MAX_HEAP];
    int size;
} MinHeap;

void swap_int(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

void init_heap(MinHeap *h) {
    h->size = 0;
}

void sift_up(MinHeap *h, int index) {
    while (index > 0) {
        int parent = (index - 1) / 2;
        if (h->data[parent] <= h->data[index]) break;
        swap_int(&h->data[parent], &h->data[index]);
        index = parent;
    }
}

void sift_down(MinHeap *h, int index) {
    while (1) {
        int left = index * 2 + 1;
        int right = index * 2 + 2;
        int smallest = index;
        if (left < h->size && h->data[left] < h->data[smallest]) smallest = left;
        if (right < h->size && h->data[right] < h->data[smallest]) smallest = right;
        if (smallest == index) break;
        swap_int(&h->data[index], &h->data[smallest]);
        index = smallest;
    }
}

int push(MinHeap *h, int value) {
    if (h->size >= MAX_HEAP) return 0;
    h->data[h->size] = value;
    sift_up(h, h->size);
    ++h->size;
    return 1;
}

int pop(MinHeap *h, int *out) {
    if (h->size == 0) return 0;
    *out = h->data[0];
    h->data[0] = h->data[--h->size];
    sift_down(h, 0);
    return 1;
}

void print_heap(const MinHeap *h) {
    for (int i = 0; i < h->size; ++i) {
        printf("%d ", h->data[i]);
    }
    printf("\n");
}

int main(void) {
    int values[] = {35, 12, 28, 7, 18, 3, 42};
    MinHeap h;
    init_heap(&h);
    for (int i = 0; i < 7; ++i) {
        push(&h, values[i]);
        print_heap(&h);
    }

    int x;
    printf("pop order: ");
    while (pop(&h, &x)) {
        printf("%d ", x);
    }
    printf("\n");
    return 0;
}

