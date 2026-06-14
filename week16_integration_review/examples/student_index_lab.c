/*
 * Week 16 综合设计、复习与 AI 辅助实践
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 32
#define NAME_LEN 32
#define HASH_SIZE 53


/* 结构体定义：把抽象数据类型落实为 C 语言中的字段。 */
typedef struct {
    int id;
    char name[NAME_LEN];
    int score;
} Student;


/* 结构体定义：把抽象数据类型落实为 C 语言中的字段。 */
typedef struct {
    Student data[MAX_STUDENTS];
    int size;
} StudentList;


/* 结构体定义：把抽象数据类型落实为 C 语言中的字段。 */
typedef struct {
    int key;
    int index;
} HashSlot;


/* 综合实验中的哈希索引初始化，key=-1 表示空槽。 */
void init_hash(HashSlot table[]) {
    for (int i = 0; i < HASH_SIZE; ++i) {
        table[i].key = -1;
        table[i].index = -1;
    }
}


/* 学号到桶位置的映射函数，示例使用取模。 */
int hash_id(int id) {
    return id % HASH_SIZE;
}


/* 添加学生时同时维护顺序表和哈希索引，保证后续按学号快速查找。 */
int add_student(StudentList *list, HashSlot table[], int id, const char *name, int score) {
    if (list->size >= MAX_STUDENTS) return 0;
    int index = list->size++;
    list->data[index].id = id;
    strncpy(list->data[index].name, name, NAME_LEN - 1);
    list->data[index].name[NAME_LEN - 1] = '\0';
    list->data[index].score = score;

    int start = hash_id(id);
    for (int i = 0; i < HASH_SIZE; ++i) {
        int pos = (start + i) % HASH_SIZE;
        if (table[pos].key == -1) {
            table[pos].key = id;
            table[pos].index = index;
            return 1;
        }
    }
    return 0;
}

Student *find_by_id(StudentList *list, HashSlot table[], int id) {
    int start = hash_id(id);
    for (int i = 0; i < HASH_SIZE; ++i) {
        int pos = (start + i) % HASH_SIZE;
        if (table[pos].key == -1) return NULL;
        if (table[pos].key == id) return &list->data[table[pos].index];
    }
    return NULL;
}


/* 按成绩排序使用插入排序，示例规模较小时实现简单且稳定。 */
void sort_by_score(StudentList *list) {
    for (int i = 1; i < list->size; ++i) {
        Student key = list->data[i];
        int j = i - 1;
        while (j >= 0 && list->data[j].score < key.score) {
            list->data[j + 1] = list->data[j];
            --j;
        }
        list->data[j + 1] = key;
    }
}


/* 输出所有学生记录，用于检查排序和查询结果。 */
void print_students(const StudentList *list) {
    for (int i = 0; i < list->size; ++i) {
        printf("%d %-8s %d\n", list->data[i].id, list->data[i].name, list->data[i].score);
    }
}


/* 用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。 */
int main(void) {
    StudentList list = {.size = 0};
    HashSlot table[HASH_SIZE];
    init_hash(table);

    add_student(&list, table, 202401, "Lin", 91);
    add_student(&list, table, 202402, "Chen", 86);
    add_student(&list, table, 202403, "Wang", 95);
    add_student(&list, table, 202404, "Zhao", 78);

    Student *found = find_by_id(&list, table, 202403);
    if (found) printf("found: %s score=%d\n", found->name, found->score);

    sort_by_score(&list);
    printf("rank by score:\n");
    print_students(&list);
    return 0;
}

