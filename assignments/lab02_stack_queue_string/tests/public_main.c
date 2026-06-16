#include "lab02_stack_queue_string.h"
#include <stdio.h>

int main(void) {
    printf("brackets: %s\n", brackets_matched("a[(b+c)*d]") ? "matched" : "mismatch");
    CircularQueue queue;
    cq_init(&queue);
    for (int value = 10; value <= 70; value += 10) cq_enqueue(&queue, value);
    int discarded = 0;
    cq_dequeue(&queue, &discarded);
    cq_dequeue(&queue, &discarded);
    printf("queue:");
    int value = 0;
    while (cq_dequeue(&queue, &value)) printf(" %d", value);
    printf("\n");
    printf("match abcac: %d\n", kmp_search("ababcabcacbab", "abcac"));
    return 0;
}

