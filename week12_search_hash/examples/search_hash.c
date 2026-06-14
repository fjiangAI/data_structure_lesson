/*
 * Week 12 查找结构：顺序、二分与哈希表
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>

#define TABLE_SIZE 11
#define EMPTY -1


/* 顺序查找逐个比较，不要求数据有序，但最坏要看完所有元素。 */
int sequential_search(const int a[], int n, int key) {
    for (int i = 0; i < n; ++i) {
        if (a[i] == key) return i;
    }
    return -1;
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


/* 哈希表空槽要有明确标记，这里用 EMPTY 表示从未存放关键字。 */
void init_table(int table[]) {
    for (int i = 0; i < TABLE_SIZE; ++i) table[i] = EMPTY;
}


/* 哈希函数把关键字映射到桶下标，实际系统要关注分布是否均匀。 */
int hash(int key) {
    return key % TABLE_SIZE;
}


/* 线性探测插入：冲突时按固定序列寻找下一个空槽。 */
int hash_insert(int table[], int key) {
    int start = hash(key);
    for (int i = 0; i < TABLE_SIZE; ++i) {
        int pos = (start + i) % TABLE_SIZE;
        if (table[pos] == EMPTY || table[pos] == key) {
            table[pos] = key;
            return pos;
        }
    }
    return -1;
}


/* 线性探测查找必须沿同一探测序列前进，遇到空槽才停止。 */
int hash_search(int table[], int key) {
    int start = hash(key);
    for (int i = 0; i < TABLE_SIZE; ++i) {
        int pos = (start + i) % TABLE_SIZE;
        if (table[pos] == EMPTY) return -1;
        if (table[pos] == key) return pos;
    }
    return -1;
}


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
int main(void) {
    int sorted[] = {3, 8, 12, 19, 24, 31, 44};
    int n = (int)(sizeof(sorted) / sizeof(sorted[0]));
    printf("seq search 24 -> %d\n", sequential_search(sorted, n, 24));
    printf("bin search 24 -> %d\n", binary_search(sorted, n, 24));

    int table[TABLE_SIZE];
    init_table(table);
    int keys[] = {22, 41, 53, 46, 30, 13, 1};
    for (int i = 0; i < 7; ++i) {
        printf("insert %d at %d\n", keys[i], hash_insert(table, keys[i]));
    }
    printf("search 46 -> %d\n", hash_search(table, 46));
    return 0;
}

