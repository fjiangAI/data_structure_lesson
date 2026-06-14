#include <stdio.h>

#define TABLE_SIZE 11
#define EMPTY -1

int sequential_search(const int a[], int n, int key) {
    for (int i = 0; i < n; ++i) {
        if (a[i] == key) return i;
    }
    return -1;
}

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

void init_table(int table[]) {
    for (int i = 0; i < TABLE_SIZE; ++i) table[i] = EMPTY;
}

int hash(int key) {
    return key % TABLE_SIZE;
}

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

int hash_search(int table[], int key) {
    int start = hash(key);
    for (int i = 0; i < TABLE_SIZE; ++i) {
        int pos = (start + i) % TABLE_SIZE;
        if (table[pos] == EMPTY) return -1;
        if (table[pos] == key) return pos;
    }
    return -1;
}

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

