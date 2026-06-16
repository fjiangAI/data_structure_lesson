#include "lab06_integrated_project.h"

void system_init(StudentSystem *system) {
    /* TODO: initialize record table and index state. */
    (void)system;
}

int system_add(StudentSystem *system, int id, const char *name, int score) {
    /* TODO: reject duplicate id, append record, update index. */
    (void)system;
    (void)id;
    (void)name;
    (void)score;
    return 0;
}

const Student *system_find(const StudentSystem *system, int id) {
    /* TODO: use index to locate the record. */
    (void)system;
    (void)id;
    return 0;
}

int system_delete(StudentSystem *system, int id) {
    /* TODO: delete record and rebuild or repair index. */
    (void)system;
    (void)id;
    return 0;
}

void system_rank_names(const StudentSystem *system, char *out, size_t cap) {
    /* TODO: sort by score descending and write names. */
    (void)system;
    if (cap > 0) out[0] = '\0';
}

