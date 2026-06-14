#include <stdio.h>
#include <stdlib.h>

void print_array(const int a[], int n) {
    for (int i = 0; i < n; ++i) printf("%d ", a[i]);
    printf("\n");
}

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

int get_max(const int a[], int n) {
    int m = a[0];
    for (int i = 1; i < n; ++i) if (a[i] > m) m = a[i];
    return m;
}

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

void radix_sort(int a[], int n) {
    int max_value = get_max(a, n);
    for (int exp = 1; max_value / exp > 0; exp *= 10) {
        radix_counting_pass(a, n, exp);
    }
}

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

