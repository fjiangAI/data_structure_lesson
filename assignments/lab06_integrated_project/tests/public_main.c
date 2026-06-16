#include "lab06_integrated_project.h"
#include <stdio.h>

int main(void) {
    StudentSystem system;
    system_init(&system);
    system_add(&system, 202401, "Lin", 90);
    system_add(&system, 202402, "Zhao", 80);
    system_add(&system, 202403, "Wang", 95);
    system_add(&system, 202404, "Chen", 85);
    const Student *student = system_find(&system, 202403);
    if (student) printf("find 202403: %s %d\n", student->name, student->score);
    char rank[128];
    system_rank_names(&system, rank, sizeof(rank));
    printf("rank: %s\n", rank);
    printf("delete 202402: %s\n", system_delete(&system, 202402) ? "ok" : "fail");
    return 0;
}

