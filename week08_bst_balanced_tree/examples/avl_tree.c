/*
 * Week 08 二叉搜索树与平衡树基础
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>
#include <stdlib.h>


/* 结构体定义：把抽象数据类型落实为 C 语言中的字段。 */
typedef struct Node {
    int key;
    int height;
    struct Node *left;
    struct Node *right;
} Node;


/* 返回子树高度：普通二叉树版本递归计算，AVL 版本读取结点中维护的高度字段。 */
int height(Node *node) {
    return node ? node->height : 0;
}


/* 小工具函数，避免在高度更新时重复写条件表达式。 */
int max_int(int a, int b) {
    return a > b ? a : b;
}

Node *new_node(int key) {
    Node *node = (Node *)malloc(sizeof(Node));
    if (!node) return NULL;
    node->key = key;
    node->height = 1;
    node->left = NULL;
    node->right = NULL;
    return node;
}


/* AVL 每次修改子树后都要重新计算高度，高度是判断平衡的基础。 */
void update_height(Node *node) {
    node->height = max_int(height(node->left), height(node->right)) + 1;
}


/* 平衡因子等于左子树高度减右子树高度，用它判断旋转类型。 */
int balance_factor(Node *node) {
    return node ? height(node->left) - height(node->right) : 0;
}

Node *rotate_right(Node *y) {
    Node *x = y->left;
    Node *t2 = x->right;
    x->right = y;
    y->left = t2;
    update_height(y);
    update_height(x);
    return x;
}

Node *rotate_left(Node *x) {
    Node *y = x->right;
    Node *t2 = y->left;
    y->left = x;
    x->right = t2;
    update_height(x);
    update_height(y);
    return y;
}

Node *insert(Node *root, int key) {
    if (!root) return new_node(key);
    if (key < root->key) root->left = insert(root->left, key);
    else if (key > root->key) root->right = insert(root->right, key);
    else return root;

    update_height(root);
    int bf = balance_factor(root);

    if (bf > 1 && key < root->left->key) return rotate_right(root);
    if (bf < -1 && key > root->right->key) return rotate_left(root);
    if (bf > 1 && key > root->left->key) {
        root->left = rotate_left(root->left);
        return rotate_right(root);
    }
    if (bf < -1 && key < root->right->key) {
        root->right = rotate_right(root->right);
        return rotate_left(root);
    }
    return root;
}


/* BST/AVL 查找利用关键字大小，每次只进入一侧子树。 */
int search(Node *root, int key) {
    while (root) {
        if (key == root->key) return 1;
        root = key < root->key ? root->left : root->right;
    }
    return 0;
}


/* 中序遍历：左、根、右；在 BST 中会得到有序序列。 */
void inorder(Node *root) {
    if (!root) return;
    inorder(root->left);
    printf("%d(h=%d) ", root->key, root->height);
    inorder(root->right);
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
    int keys[] = {30, 20, 10, 25, 40, 50, 45};
    int n = (int)(sizeof(keys) / sizeof(keys[0]));
    Node *root = NULL;
    for (int i = 0; i < n; ++i) {
        root = insert(root, keys[i]);
        printf("after insert %d: ", keys[i]);
        inorder(root);
        printf("\n");
    }
    printf("search 25 -> %s\n", search(root, 25) ? "yes" : "no");
    destroy(root);
    return 0;
}

