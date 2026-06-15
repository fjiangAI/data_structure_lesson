/*
 * Week 01 课程导论与算法分析基础
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>


/* 线性扫描示例：每个元素访问一次，用来观察 O(n) 的来源。 */
long long linear_sum(const int a[], int n) {
    long long sum = 0;
    for (int i = 0; i < n; ++i) {
        sum += a[i];
    }
    return sum;
}


/* 二分查找示例：区间 [left, right] 每轮缩小一半，前提是数组有序且支持随机访问。 */
int binary_search(const int a[], int n, int key) {
    int left = 0;
    int right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (a[mid] == key) return mid;
        if (a[mid] < key) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}


/* 双重循环示例：枚举所有二元组，用来观察 O(n^2) 的增长。 */
long long pair_count_less_than(const int a[], int n, int limit) {
    long long count = 0;
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            if (a[i] + a[j] < limit) {
                ++count;
            }
        }
    }
    return count;
}


/* 递归调用示例：故意使用朴素递归，展示重复子问题会造成指数级调用。 */
long long fibonacci_calls(int n, long long *calls) {
    ++(*calls);
    if (n <= 1) return n;
    return fibonacci_calls(n - 1, calls) + fibonacci_calls(n - 2, calls);
}


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
int main(void) {
    int a[] = {1, 3, 5, 7, 9, 11, 13, 15};
    int n = (int)(sizeof(a) / sizeof(a[0]));

    printf("linear sum = %lld\n", linear_sum(a, n));
    printf("binary search 9 -> index %d\n", binary_search(a, n, 9));
    printf("pair count less than 16 = %lld\n", pair_count_less_than(a, n, 16));

    long long calls = 0;
    long long value = fibonacci_calls(8, &calls);
    printf("fib(8) = %lld, recursive calls = %lld\n", value, calls);
    return 0;
}

