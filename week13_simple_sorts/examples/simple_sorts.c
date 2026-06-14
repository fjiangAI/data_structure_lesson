#include <stdio.h>

void print_array(const int a[], int n) {
    for (int i = 0; i < n; ++i) printf("%d ", a[i]);
    printf("\n");
}

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

void copy_array(int dst[], const int src[], int n) {
    for (int i = 0; i < n; ++i) dst[i] = src[i];
}

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

