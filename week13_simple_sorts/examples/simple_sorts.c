/*
 * Week 13 排序算法之一：简单排序
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>


/* 输出数组用于观察排序每次操作后的结果。 */
void print_array(const int a[], int n) {
    for (int i = 0; i < n; ++i) printf("%d ", a[i]);
    printf("\n");
}


/* 插入排序维护有序前缀，把当前元素插入前缀中的合适位置。 */
void insertion_sort(int a[], int n) {
    for (int i = 1; i < n; ++i) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            --j;
        }
        a[j + 1] = key;
    }
}


/* 选择排序每轮选择未排序区间最小元素放到前面。 */
void selection_sort(int a[], int n) {
    for (int i = 0; i < n - 1; ++i) {
        int min_index = i;
        for (int j = i + 1; j < n; ++j) {
            if (a[j] < a[min_index]) min_index = j;
        }
        int t = a[i];
        a[i] = a[min_index];
        a[min_index] = t;
    }
}


/* 冒泡排序通过相邻交换把大元素逐步推到后面，可用 swapped 提前结束。 */
void bubble_sort(int a[], int n) {
    for (int pass = 0; pass < n - 1; ++pass) {
        int swapped = 0;
        for (int i = 0; i < n - 1 - pass; ++i) {
            if (a[i] > a[i + 1]) {
                int t = a[i];
                a[i] = a[i + 1];
                a[i + 1] = t;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}


/* 排序实验需要复制原数组，避免前一个算法的结果影响后一个算法。 */
void copy_array(int dst[], const int src[], int n) {
    for (int i = 0; i < n; ++i) dst[i] = src[i];
}


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
int main(void) {
    int source[] = {29, 10, 14, 37, 14, 3};
    int n = (int)(sizeof(source) / sizeof(source[0]));
    int a[6];

    copy_array(a, source, n);
    insertion_sort(a, n);
    printf("insertion: ");
    print_array(a, n);

    copy_array(a, source, n);
    selection_sort(a, n);
    printf("selection: ");
    print_array(a, n);

    copy_array(a, source, n);
    bubble_sort(a, n);
    printf("bubble: ");
    print_array(a, n);
    return 0;
}

