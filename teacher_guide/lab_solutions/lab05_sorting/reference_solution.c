#include "lab05_sorting.h"
#include <stdlib.h>

void insertion_sort(int *array, int n) {
    for (int i = 1; i < n; ++i) {
        int key = array[i];
        int j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            --j;
        }
        array[j + 1] = key;
    }
}

static void merge(int *a, int *tmp, int left, int mid, int right) {
    int i = left, j = mid, k = left;
    while (i < mid && j < right) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
    while (i < mid) tmp[k++] = a[i++];
    while (j < right) tmp[k++] = a[j++];
    for (i = left; i < right; ++i) a[i] = tmp[i];
}

static void merge_rec(int *a, int *tmp, int left, int right) {
    if (right - left <= 1) return;
    int mid = left + (right - left) / 2;
    merge_rec(a, tmp, left, mid);
    merge_rec(a, tmp, mid, right);
    merge(a, tmp, left, mid, right);
}

void merge_sort(int *array, int n) {
    int tmp[64];
    if (n > 64) return;
    merge_rec(array, tmp, 0, n);
}

int counting_sort(const int *input, int n, int *output, int max_key) {
    int counts[128] = {0};
    if (max_key >= 128) return 0;
    for (int i = 0; i < n; ++i) {
        if (input[i] < 0 || input[i] > max_key) return 0;
        counts[input[i]] += 1;
    }
    int k = 0;
    for (int key = 0; key <= max_key; ++key) {
        while (counts[key]-- > 0) output[k++] = key;
    }
    return 1;
}

