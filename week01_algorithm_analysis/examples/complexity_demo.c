#include <stdio.h>

long long linear_sum(const int a[], int n) {
    long long sum = 0;
    for (int i = 0; i < n; ++i) {
        sum += a[i];
    }
    return sum;
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

long long fibonacci_calls(int n, long long *calls) {
    ++(*calls);
    if (n <= 1) return n;
    return fibonacci_calls(n - 1, calls) + fibonacci_calls(n - 2, calls);
}

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

