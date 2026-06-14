#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int key;
    int height;
    struct Node *left;
    struct Node *right;
} Node;

int height(Node *node) {
    return node ? node->height : 0;
}

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

void update_height(Node *node) {
    node->height = max_int(height(node->left), height(node->right)) + 1;
}

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

int search(Node *root, int key) {
    while (root) {
        if (key == root->key) return 1;
        root = key < root->key ? root->left : root->right;
    }
    return 0;
}

void inorder(Node *root) {
    if (!root) return;
    inorder(root->left);
    printf("%d(h=%d) ", root->key, root->height);
    inorder(root->right);
}

void destroy(Node *root) {
    if (!root) return;
    destroy(root->left);
    destroy(root->right);
    free(root);
}

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

