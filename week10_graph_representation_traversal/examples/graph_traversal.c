#include <stdio.h>
#include <stdlib.h>

#define V 6

typedef struct Edge {
    int to;
    struct Edge *next;
} Edge;

typedef struct {
    Edge *head[V];
} Graph;

void init_graph(Graph *g) {
    for (int i = 0; i < V; ++i) g->head[i] = NULL;
}

void add_edge(Graph *g, int u, int v) {
    Edge *e = (Edge *)malloc(sizeof(Edge));
    e->to = v;
    e->next = g->head[u];
    g->head[u] = e;
}

void add_undirected_edge(Graph *g, int u, int v) {
    add_edge(g, u, v);
    add_edge(g, v, u);
}

void dfs(Graph *g, int u, int visited[]) {
    visited[u] = 1;
    printf("%d ", u);
    for (Edge *e = g->head[u]; e; e = e->next) {
        if (!visited[e->to]) dfs(g, e->to, visited);
    }
}

void bfs(Graph *g, int start) {
    int visited[V] = {0};
    int queue[V];
    int front = 0, rear = 0;
    visited[start] = 1;
    queue[rear++] = start;

    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        for (Edge *e = g->head[u]; e; e = e->next) {
            if (!visited[e->to]) {
                visited[e->to] = 1;
                queue[rear++] = e->to;
            }
        }
    }
}

void destroy(Graph *g) {
    for (int i = 0; i < V; ++i) {
        Edge *p = g->head[i];
        while (p) {
            Edge *next = p->next;
            free(p);
            p = next;
        }
    }
}

int main(void) {
    Graph g;
    init_graph(&g);
    add_undirected_edge(&g, 0, 1);
    add_undirected_edge(&g, 0, 2);
    add_undirected_edge(&g, 1, 3);
    add_undirected_edge(&g, 2, 4);
    add_undirected_edge(&g, 3, 5);

    int visited[V] = {0};
    printf("DFS: ");
    dfs(&g, 0, visited);
    printf("\nBFS: ");
    bfs(&g, 0);
    printf("\n");

    destroy(&g);
    return 0;
}

