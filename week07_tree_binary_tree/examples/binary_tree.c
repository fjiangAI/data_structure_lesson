#include <stdio.h>
#include <stdlib.h>

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

void preorder(const Node *root) {
    if (!root) return;
    printf("%c ", root->data);
    preorder(root->left);
    preorder(root->right);
}

void inorder(const Node *root) {
    if (!root) return;
    inorder(root->left);
    printf("%c ", root->data);
    inorder(root->right);
}

void postorder(const Node *root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    printf("%c ", root->data);
}

int height(const Node *root) {
    if (!root) return 0;
    int lh = height(root->left);
    int rh = height(root->right);
    return (lh > rh ? lh : rh) + 1;
}

int count_nodes(const Node *root) {
    if (!root) return 0;
    return 1 + count_nodes(root->left) + count_nodes(root->right);
}

void destroy(Node *root) {
    if (!root) return;
    destroy(root->left);
    destroy(root->right);
    free(root);
}

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

