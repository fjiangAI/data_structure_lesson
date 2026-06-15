/*
 * Week 14 排序算法之二：快速、归并与堆排序
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>
#include <stdlib.h>


/* 输出数组用于观察排序每次操作后的结果。 */
void print_array(const int a[], int n) {
    for (int i = 0; i < n; ++i) printf("%d ", a[i]);
    printf("\n");
}


/* 交换两个整数位置，排序和堆调整中都会频繁使用。 */
void swap_int(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}


/* 快速排序划分函数维护小于等于 pivot 的左侧区间。 */
int partition(int a[], int low, int high) {
    int pivot = a[high];
    int i = low;
    for (int j = low; j < high; ++j) {
        if (a[j] <= pivot) {
            swap_int(&a[i], &a[j]);
            ++i;
        }
    }
    swap_int(&a[i], &a[high]);
    return i;
}


/* 快速排序先划分确定 pivot 最终位置，再递归处理左右区间。 */
void quick_sort(int a[], int low, int high) {
    if (low >= high) return;
    int p = partition(a, low, high);
    quick_sort(a, low, p - 1);
    quick_sort(a, p + 1, high);
}


/* 归并函数把两个有序子段线性合并成一个有序段。 */
void merge(int a[], int temp[], int left, int mid, int right) {
    int i = left, j = mid + 1, k = left;
    while (i <= mid && j <= right) {
        if (a[i] <= a[j]) temp[k++] = a[i++];
        else temp[k++] = a[j++];
    }
    while (i <= mid) temp[k++] = a[i++];
    while (j <= right) temp[k++] = a[j++];
    for (i = left; i <= right; ++i) a[i] = temp[i];
}


/* 归并排序递归拆分区间，直到单元素区间天然有序。 */
void merge_sort_rec(int a[], int temp[], int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    merge_sort_rec(a, temp, left, mid);
    merge_sort_rec(a, temp, mid + 1, right);
    merge(a, temp, left, mid, right);
}


/* 归并排序需要辅助数组保存合并结果，空间复杂度为 O(n)。 */
void merge_sort(int a[], int n) {
    int *temp = (int *)malloc(sizeof(int) * n);
    if (!temp) return;
    merge_sort_rec(a, temp, 0, n - 1);
    free(temp);
}


/* 堆排序中的下滤维护最大堆性质。 */
void heap_sift_down(int a[], int n, int index) {
    while (1) {
        int left = index * 2 + 1;
        int right = index * 2 + 2;
        int largest = index;
        if (left < n && a[left] > a[largest]) largest = left;
        if (right < n && a[right] > a[largest]) largest = right;
        if (largest == index) break;
        swap_int(&a[index], &a[largest]);
        index = largest;
    }
}


/* 堆排序先建最大堆，再反复把堆顶最大值放到数组末尾。 */
void heap_sort(int a[], int n) {
    for (int i = n / 2 - 1; i >= 0; --i) heap_sift_down(a, n, i);
    for (int end = n - 1; end > 0; --end) {
        swap_int(&a[0], &a[end]);
        heap_sift_down(a, end, 0);
    }
}


/* 排序实验需要复制原数组，避免前一个算法的结果影响后一个算法。 */
void copy_array(int dst[], const int src[], int n) {
    for (int i = 0; i < n; ++i) dst[i] = src[i];
}


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
int main(void) {
    int source[] = {38, 27, 43, 3, 9, 82, 10};
    int n = (int)(sizeof(source) / sizeof(source[0]));
    int a[7];

    copy_array(a, source, n);
    quick_sort(a, 0, n - 1);
    printf("quick: ");
    print_array(a, n);

    copy_array(a, source, n);
    merge_sort(a, n);
    printf("merge: ");
    print_array(a, n);

    copy_array(a, source, n);
    heap_sort(a, n);
    printf("heap: ");
    print_array(a, n);
    return 0;
}

