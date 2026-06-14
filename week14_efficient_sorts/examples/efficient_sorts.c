#include <stdio.h>
#include <stdlib.h>

void print_array(const int a[], int n) {
    for (int i = 0; i < n; ++i) printf("%d ", a[i]);
    printf("\n");
}

void swap_int(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

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

void quick_sort(int a[], int low, int high) {
    if (low >= high) return;
    int p = partition(a, low, high);
    quick_sort(a, low, p - 1);
    quick_sort(a, p + 1, high);
}

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

void merge_sort_rec(int a[], int temp[], int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    merge_sort_rec(a, temp, left, mid);
    merge_sort_rec(a, temp, mid + 1, right);
    merge(a, temp, left, mid, right);
}

void merge_sort(int a[], int n) {
    int *temp = (int *)malloc(sizeof(int) * n);
    if (!temp) return;
    merge_sort_rec(a, temp, 0, n - 1);
    free(temp);
}

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

void heap_sort(int a[], int n) {
    for (int i = n / 2 - 1; i >= 0; --i) heap_sift_down(a, n, i);
    for (int end = n - 1; end > 0; --end) {
        swap_int(&a[0], &a[end]);
        heap_sift_down(a, end, 0);
    }
}

void copy_array(int dst[], const int src[], int n) {
    for (int i = 0; i < n; ++i) dst[i] = src[i];
}

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

