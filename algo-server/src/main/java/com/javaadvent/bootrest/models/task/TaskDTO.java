package com.javaadvent.bootrest.models.task;

import com.google.cloud.language.v1beta2.Entity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Size;
import java.util.List;

/**
 * This data transfer object contains the information of a single task
 * entry and specifies validation rules that are used to ensure that only
 * valid information can be saved to the used database.
 */
public final class TaskDTO {

    private String id;

    @NotEmpty
    @Size(max = Task.MAX_LENGTH_CONTENT)
    private String content;

    private List<String> entities;

    public TaskDTO() {}

    public String getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<String> getEntities() {
        return entities;
    }

    public void setEntities(List<String> entities) {
        this.entities = entities;
    }

    @Override
    public String toString() {
        return String.format(
                "TaskDTO[id=%s, content=%s, entities(%s)]",
                this.id,
                this.content,
                this.entities.toString()
        );
    }
}
