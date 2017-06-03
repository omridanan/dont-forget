package com.javaadvent.bootrest.models.task;

import org.springframework.test.util.ReflectionTestUtils;

class TaskBuilder {

    private String description;
    private String id;
    private String title = "NOT_IMPORTANT";

    TaskBuilder() {

    }

    TaskBuilder description(String description) {
        this.description = description;
        return this;
    }

    TaskBuilder id(String id) {
        this.id = id;
        return this;
    }

    TaskBuilder title(String title) {
        this.title = title;
        return this;
    }

    Task build() {
        Task task = Task.getBuilder()
                .title(title)
                .description(description)
                .build();

        ReflectionTestUtils.setField(task, "id", id);

        return task;
    }
}
