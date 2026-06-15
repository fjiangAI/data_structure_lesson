/*
 * Week 07 树与二叉树基础
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>
#include <stdlib.h>


/* 结构体定义：把抽象数据类型落实为 C 语言中的字段。 */
typedef struct Node {
    char data;
    struct Node *left;
    struct Node *right;
} Node;

Node *new_node(char data) {
    Node *node = (Node *)malloc(sizeof(Node));
    if (!node) return NULL;
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

Node *build_demo_tree(void) {
    Node *a = new_node('A');
    Node *b = new_node('B');
    Node *c = new_node('C');
    Node *d = new_node('D');
    Node *e = new_node('E');
    Node *f = new_node('F');
    a->left = b;
    a->right = c;
    b->left = d;
    b->right = e;
    c->right = f;
    return a;
}


/* 前序遍历：先访问根，再递归访问左子树和右子树。 */
void preorder(const Node *root) {
    if (!root) return;
    printf("%c ", root->data);
    preorder(root->left);
    preorder(root->right);
}


/* 中序遍历：左、根、右；在 BST 中会得到有序序列。 */
void inorder(const Node *root) {
    if (!root) return;
    inorder(root->left);
    printf("%c ", root->data);
    inorder(root->right);
}


/* 后序遍历：先处理左右子树，最后处理根，常用于释放树。 */
void postorder(const Node *root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    printf("%c ", root->data);
}


/* 返回子树高度：普通二叉树版本递归计算，AVL 版本读取结点中维护的高度字段。 */
int height(const Node *root) {
    if (!root) return 0;
    int lh = height(root->left);
    int rh = height(root->right);
    return (lh > rh ? lh : rh) + 1;
}


/* 结点计数递归：根结点 1 个，加上左右子树结点数。 */
int count_nodes(const Node *root) {
    if (!root) return 0;
    return 1 + count_nodes(root->left) + count_nodes(root->right);
}


/* 释放结构中的动态结点；释放前要保证仍能访问到尚未释放的部分。 */
void destroy(Node *root) {
    if (!root) return;
    destroy(root->left);
    destroy(root->right);
    free(root);
}


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
int main(void) {
    Node *root = build_demo_tree();
    printf("preorder: ");
    preorder(root);
    printf("\ninorder: ");
    inorder(root);
    printf("\npostorder: ");
    postorder(root);
    printf("\nheight=%d nodes=%d\n", height(root), count_nodes(root));
    destroy(root);
    return 0;
}

