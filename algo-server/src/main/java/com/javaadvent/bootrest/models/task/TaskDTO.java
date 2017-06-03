package com.javaadvent.bootrest.models.task;

import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Size;

/**
 * This data transfer object contains the information of a single task
 * entry and specifies validation rules that are used to ensure that only
 * valid information can be saved to the used database.
 */
public final class TaskDTO {

    private String id;

    @Size(max = Task.MAX_LENGTH_DESCRIPTION)
    private String description;

    @NotEmpty
    @Size(max = Task.MAX_LENGTH_TITLE)
    private String title;

    public TaskDTO() {

    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getTitle() {
        return title;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return String.format(
                "TaskDTO[id=%s, description=%s, title=%s]",
                this.id,
                this.description,
                this.title
        );
    }
}
