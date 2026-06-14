/*
 * Week 10 图的表示与遍历
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>
#include <stdlib.h>

#define V 6


/* 结构体定义：把抽象数据类型落实为 C 语言中的字段。 */
typedef struct Edge {
    int to;
    struct Edge *next;
} Edge;


/* 结构体定义：把抽象数据类型落实为 C 语言中的字段。 */
typedef struct {
    Edge *head[V];
} Graph;


/* 邻接表初始化时，每个顶点的边链表都为空。 */
void init_graph(Graph *g) {
    for (int i = 0; i < V; ++i) g->head[i] = NULL;
}


/* 添加一条有向边，使用头插法把边结点接到顶点的邻接链表。 */
void add_edge(Graph *g, int u, int v) {
    Edge *e = (Edge *)malloc(sizeof(Edge));
    e->to = v;
    e->next = g->head[u];
    g->head[u] = e;
}


/* 无向边可以看成两条方向相反的有向边。 */
void add_undirected_edge(Graph *g, int u, int v) {
    add_edge(g, u, v);
    add_edge(g, v, u);
}


/* 深度优先遍历沿一条路径尽量深入，递归调用栈保存回退位置。 */
void dfs(Graph *g, int u, int visited[]) {
    visited[u] = 1;
    printf("%d ", u);
    for (Edge *e = g->head[u]; e; e = e->next) {
        if (!visited[e->to]) dfs(g, e->to, visited);
    }
}


/* 广度优先遍历使用队列，保证按距离层次扩展顶点。 */
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


/* 释放结构中的动态结点；释放前要保证仍能访问到尚未释放的部分。 */
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


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
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

