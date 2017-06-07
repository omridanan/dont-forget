package com.javaadvent.bootrest.models.group;

import com.google.cloud.language.v1beta2.Entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import static com.javaadvent.bootrest.util.PreCondition.*;

/**
 * represent the task objet in mongo tasks collection
 */
@Document(collection = "tasks_group")
public final class Group {

    @Id
    private String id;
    private String profileId;
    private String taskLeaderId;
    private List<String> tasks;
    private int lastUpdated;

    public Group() {}

    private Group(Builder builder) {
        this.profileId = builder.profileId;
        this.taskLeaderId = builder.taskLeaderId;
        this.tasks = builder.tasks;
        this.lastUpdated = builder.lastUpdated;
    }

    static Builder getBuilder() {
        return new Builder();
    }

    public String getId() {
        return id;
    }

    public String getProfileId() {
        return profileId;
    }

    public String getTaskLeaderId() {
        return taskLeaderId;
    }

    public List<String> getTasks() {
        return tasks;
    }

    public int getLastUpdated() {
        return lastUpdated;
    }

    public void update(String profileId, String taskLeaderId, List<String> tasks, int lastUpdated) {
        this.profileId = profileId;
        this.taskLeaderId = taskLeaderId;
        this.tasks = tasks;
        this.lastUpdated = lastUpdated;
    }

    @Override
    public String toString() {
        return String.format(
                "Group[id=%s, profileId=%s, taskLeaderId=%s, tasks(%s), lastUpdated=%s]",
                this.id,
                this.profileId,
                this.taskLeaderId,
                this.tasks.toString(),
                this.lastUpdated
        );
    }

    /**
     * We don't have to use the builder pattern here because the constructed class has only two String fields.
     * However, I use the builder pattern in this example because it makes the code a bit easier to read.
     */
    static class Builder {

        private String profileId;

        private String taskLeaderId;

        private List<String> tasks;

        private int lastUpdated;

        private Builder() {}

        Builder profileId(String profileId) {
            this.profileId = profileId;
            return this;
        }

        Builder taskLeaderId(String taskLeaderId) {
            this.taskLeaderId = taskLeaderId;
            return this;
        }

        Builder tasks(List<String> tasks) {
            this.tasks = tasks;
            return this;
        }

        Builder lastUpdated(int lastUpdated) {
            this.lastUpdated = lastUpdated;
            return this;
        }

        Group build() {
            Group build = new Group(this);

            return build;
        }
    }
}
