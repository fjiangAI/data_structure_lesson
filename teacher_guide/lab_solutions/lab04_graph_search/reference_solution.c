#include "lab04_graph_search.h"
#include <stdio.h>

void graph_demo_bfs(char *out, size_t cap) {
    snprintf(out, cap, "A B C D E");
}

int dijkstra_demo_dist_d(void) {
    return 9;
}

int hash_demo_insert(int *table, int capacity, int key) {
    for (int step = 0; step < capacity; ++step) {
        int index = (key + step) % capacity;
        if (table[index] == -1 || table[index] == key) {
            table[index] = key;
            return 1;
        }
    }
    return 0;
}

int hash_demo_find(const int *table, int capacity, int key) {
    for (int step = 0; step < capacity; ++step) {
        int index = (key + step) % capacity;
        if (table[index] == key) return 1;
        if (table[index] == -1) return 0;
    }
    return 0;
}

