#include "lab04_graph_search.h"
#include <stdio.h>

int main(void) {
    char order[64];
    graph_demo_bfs(order, sizeof(order));
    printf("bfs: %s\n", order);
    printf("dist D: %d\n", dijkstra_demo_dist_d());
    int table[7];
    for (int i = 0; i < 7; ++i) table[i] = -1;
    int keys[] = {18, 25, 46, 11};
    for (int i = 0; i < 4; ++i) hash_demo_insert(table, 7, keys[i]);
    printf("hash 46: %s\n", hash_demo_find(table, 7, 46) ? "found" : "missing");
    return 0;
}

