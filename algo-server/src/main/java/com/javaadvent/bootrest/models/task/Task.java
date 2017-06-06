package com.javaadvent.bootrest.models.task;

import com.google.cloud.language.v1beta2.Entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import static com.javaadvent.bootrest.util.PreCondition.*;

/**
 * represent the task objet in mongo tasks collection
 */
@Document(collection = "tasks")
public final class Task {

    static final int MAX_LENGTH_CONTENT = 100;

    @Id
    private String id;

    private String content;

    private List<Entity> entities;

    public Task() {}

    private Task(Builder builder) {
        this.content = builder.content;
        this.entities = builder.entities;
    }

    static Builder getBuilder() {
        return new Builder();
    }

    public List<Entity> getEntities() {
        return entities;
    }

    public String getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void update(String content, List<Entity> entities) {
        checkContent(content);

        this.content = content;
        this.entities = entities;
    }

    @Override
    public String toString() {
        return String.format(
                "Task[id=%s, content=%s, entities(%s)]",
                this.id,
                this.content,
                this.entities
        );
    }

    /**
     * We don't have to use the builder pattern here because the constructed class has only two String fields.
     * However, I use the builder pattern in this example because it makes the code a bit easier to read.
     */
    static class Builder {

        private String content;
        private List<Entity> entities;

        private Builder() {}

        Builder content(String content) {
            this.content = content;
            return this;
        }

        Builder entities(List<Entity> entities) {
            this.entities = entities;
            return this;
        }

        Task build() {
            Task build = new Task(this);

            build.checkContent(build.getContent());

            return build;
        }
    }

    private void checkContent(String content) {
        notNull(content, "content cannot be null");
        notEmpty(content, "content cannot be empty");
        isTrue(content.length() <= MAX_LENGTH_CONTENT,
                "content cannot be longer than %d characters",
                MAX_LENGTH_CONTENT
        );
    }
}
