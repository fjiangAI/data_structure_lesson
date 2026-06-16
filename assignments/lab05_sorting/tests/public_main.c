#include "lab05_sorting.h"
#include <stdio.h>

static void print_array(const char *label, const int *a, int n) {
    printf("%s:", label);
    for (int i = 0; i < n; ++i) printf(" %d", a[i]);
    printf("\n");
}

int main(void) {
    int a[] = {29, 10, 14, 37, 14, 3};
    int b[] = {38, 27, 43, 3, 9, 82, 10};
    int c[] = {4, 2, 2, 8, 3, 3, 1};
    int out[7] = {0};
    insertion_sort(a, 6);
    merge_sort(b, 7);
    counting_sort(c, 7, out, 8);
    print_array("insertion", a, 6);
    print_array("merge", b, 7);
    print_array("counting", out, 7);
    return 0;
}

