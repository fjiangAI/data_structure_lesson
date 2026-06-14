/*
 * Week 11 图算法基础
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>
#include <limits.h>

#define N 5
#define INF 1000000


/* Dijkstra 每轮选择当前 dist 最小且尚未确定的顶点。 */
int min_unvisited(const int dist[], const int visited[]) {
    int best = -1;
    for (int i = 0; i < N; ++i) {
        if (!visited[i] && (best == -1 || dist[i] < dist[best])) {
            best = i;
        }
    }
    return best;
}


/* Dijkstra 的核心是选择最小未确定顶点，并用它松弛所有邻接边。 */
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


/* 根据 prev 前驱数组递归恢复从源点到目标点的路径。 */
void print_path(int prev[], int target) {
    if (target == -1) return;
    print_path(prev, prev[target]);
    printf("%d ", target);
}


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
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

