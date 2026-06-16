#ifndef DS_LAB06_INTEGRATED_PROJECT_H
#define DS_LAB06_INTEGRATED_PROJECT_H

#include <stddef.h>

typedef struct {
    int id;
    char name[16];
    int score;
} Student;

typedef struct {
    Student data[16];
    int size;
} StudentSystem;

void system_init(StudentSystem *system);
int system_add(StudentSystem *system, int id, const char *name, int score);
const Student *system_find(const StudentSystem *system, int id);
int system_delete(StudentSystem *system, int id);
void system_rank_names(const StudentSystem *system, char *out, size_t cap);

#endif

