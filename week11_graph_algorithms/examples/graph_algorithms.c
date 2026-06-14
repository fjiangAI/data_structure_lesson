#include <stdio.h>
#include <limits.h>

#define N 5
#define INF 1000000

int min_unvisited(const int dist[], const int visited[]) {
    int best = -1;
    for (int i = 0; i < N; ++i) {
        if (!visited[i] && (best == -1 || dist[i] < dist[best])) {
            best = i;
        }
    }
    return best;
}

void dijkstra(int graph[N][N], int source, int dist[], int prev[]) {
    int visited[N] = {0};
    for (int i = 0; i < N; ++i) {
        dist[i] = INF;
        prev[i] = -1;
    }
    dist[source] = 0;

    for (int step = 0; step < N; ++step) {
        int u = min_unvisited(dist, visited);
        if (u == -1 || dist[u] == INF) break;
        visited[u] = 1;
        for (int v = 0; v < N; ++v) {
            if (graph[u][v] > 0 && !visited[v]) {
                int candidate = dist[u] + graph[u][v];
                if (candidate < dist[v]) {
                    dist[v] = candidate;
                    prev[v] = u;
                }
            }
        }
    }
}

void print_path(int prev[], int target) {
    if (target == -1) return;
    print_path(prev, prev[target]);
    printf("%d ", target);
}

int main(void) {
    int graph[N][N] = {
        {0, 10, 3, 0, 0},
        {0, 0, 1, 2, 0},
        {0, 4, 0, 8, 2},
        {0, 0, 0, 0, 7},
        {0, 0, 0, 9, 0}
    };
    int dist[N];
    int prev[N];
    dijkstra(graph, 0, dist, prev);

    for (int i = 0; i < N; ++i) {
        printf("0 -> %d: dist=%d path=", i, dist[i]);
        print_path(prev, i);
        printf("\n");
    }
    return 0;
}

