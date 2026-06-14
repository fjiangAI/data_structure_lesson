/*
 * Week 09 堆与优先队列
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>

#define MAX_HEAP 64


/* 结构体定义：把抽象数据类型落实为 C 语言中的字段。 */
typedef struct {
    int data[MAX_HEAP];
    int size;
} MinHeap;


/* 交换两个整数位置，排序和堆调整中都会频繁使用。 */
void swap_int(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}


/* 堆的 size 表示当前元素个数，数组下标关系隐含完全二叉树结构。 */
void init_heap(MinHeap *h) {
    h->size = 0;
}


/* 上滤用于插入后修复堆序：新元素不断与父结点比较并交换。 */
void sift_up(MinHeap *h, int index) {
    while (index > 0) {
        int parent = (index - 1) / 2;
        if (h->data[parent] <= h->data[index]) break;
        swap_int(&h->data[parent], &h->data[index]);
        index = parent;
    }
}


/* 下滤用于删除堆顶或建堆：父结点与更小的孩子交换直到堆序恢复。 */
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


/* 入栈只改变栈顶一端；先检查容量，再移动 top 并写入元素。 */
int push(MinHeap *h, int value) {
    if (h->size >= MAX_HEAP) return 0;
    h->data[h->size] = value;
    sift_up(h, h->size);
    ++h->size;
    return 1;
}


/* 出栈只从栈顶删除；先判断空栈，再返回栈顶元素并移动 top。 */
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


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
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

