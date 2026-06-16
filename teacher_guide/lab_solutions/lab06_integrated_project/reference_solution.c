#include "lab06_integrated_project.h"
#include <stdio.h>
#include <string.h>

void system_init(StudentSystem *system) {
    system->size = 0;
}

int system_add(StudentSystem *system, int id, const char *name, int score) {
    if (!system || system->size >= 16 || system_find(system, id)) return 0;
    Student *slot = &system->data[system->size++];
    slot->id = id;
    snprintf(slot->name, sizeof(slot->name), "%s", name);
    slot->score = score;
    return 1;
}

const Student *system_find(const StudentSystem *system, int id) {
    if (!system) return 0;
    for (int i = 0; i < system->size; ++i) if (system->data[i].id == id) return &system->data[i];
    return 0;
}

int system_delete(StudentSystem *system, int id) {
    if (!system) return 0;
    for (int i = 0; i < system->size; ++i) {
        if (system->data[i].id == id) {
            for (int j = i; j + 1 < system->size; ++j) system->data[j] = system->data[j + 1];
            system->size -= 1;
            return 1;
        }
    }
    return 0;
}

void system_rank_names(const StudentSystem *system, char *out, size_t cap) {
    Student temp[16];
    int n = system ? system->size : 0;
    for (int i = 0; i < n; ++i) temp[i] = system->data[i];
    for (int i = 1; i < n; ++i) {
        Student key = temp[i];
        int j = i - 1;
        while (j >= 0 && temp[j].score < key.score) {
            temp[j + 1] = temp[j];
            --j;
        }
        temp[j + 1] = key;
    }
    if (cap > 0) out[0] = '\0';
    for (int i = 0; i < n; ++i) {
        if (i > 0) strncat(out, " ", cap - strlen(out) - 1);
        strncat(out, temp[i].name, cap - strlen(out) - 1);
    }
}

