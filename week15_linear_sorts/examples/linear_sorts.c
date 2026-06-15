/*
 * Week 15 排序算法之三：线性时间排序
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


/* 计数排序统计关键字出现次数，再用前缀和决定输出位置。 */
void counting_sort_nonnegative(int a[], int n, int max_value) {
    int *count = (int *)calloc((size_t)max_value + 1, sizeof(int));
    int *output = (int *)malloc(sizeof(int) * n);
    if (!count || !output) {
        free(count);
        free(output);
        return;
    }

    for (int i = 0; i < n; ++i) ++count[a[i]];
    for (int i = 1; i <= max_value; ++i) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; --i) {
        output[--count[a[i]]] = a[i];
    }
    for (int i = 0; i < n; ++i) a[i] = output[i];

    free(count);
    free(output);
}


/* 基数排序需要知道最大值，从而确定要处理多少位。 */
int get_max(const int a[], int n) {
    int m = a[0];
    for (int i = 1; i < n; ++i) if (a[i] > m) m = a[i];
    return m;
}


/* 基数排序每一位都使用稳定的计数排序作为子过程。 */
void radix_counting_pass(int a[], int n, int exp) {
    int count[10] = {0};
    int *output = (int *)malloc(sizeof(int) * n);
    if (!output) return;

    for (int i = 0; i < n; ++i) ++count[(a[i] / exp) % 10];
    for (int i = 1; i < 10; ++i) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; --i) {
        int digit = (a[i] / exp) % 10;
        output[--count[digit]] = a[i];
    }
    for (int i = 0; i < n; ++i) a[i] = output[i];
    free(output);
}


/* 基数排序从低位到高位多轮稳定排序，最终得到整体有序结果。 */
void radix_sort(int a[], int n) {
    int max_value = get_max(a, n);
    for (int exp = 1; max_value / exp > 0; exp *= 10) {
        radix_counting_pass(a, n, exp);
    }
}


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
int main(void) {
    int scores[] = {4, 2, 2, 8, 3, 3, 1};
    int score_n = (int)(sizeof(scores) / sizeof(scores[0]));
    counting_sort_nonnegative(scores, score_n, 8);
    printf("counting: ");
    print_array(scores, score_n);

    int ids[] = {170, 45, 75, 90, 802, 24, 2, 66};
    int id_n = (int)(sizeof(ids) / sizeof(ids[0]));
    radix_sort(ids, id_n);
    printf("radix: ");
    print_array(ids, id_n);
    return 0;
}

