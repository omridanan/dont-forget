package com.javaadvent.bootrest.models.profile;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * represent the profile objet in mongo tasks collection
 */
@Document(collection = "profiles")
public final class Profile {

    @Id
    private String id;
    private String profileName;
    private List<String> persons;
    private List<String> taskGroups;

    public Profile() {}

    private Profile(Builder builder) {
        this.profileName = builder.profileName;
        this.persons = builder.persons;
        this.taskGroups = builder.taskGroups;
    }

    static Builder getBuilder() {
        return new Builder();
    }

    public String getId() {
        return id;
    }

    public String getProfileName() {
        return profileName;
    }

    public List<String> getPersons() {
        return persons;
    }

    public List<String> getTaskGroups() {
        return taskGroups;
    }

    public void update(String profileName, List<String> persons, List<String> taskGroups) {
        this.profileName = profileName;
        this.persons = persons;
        this.taskGroups = taskGroups;
    }

    @Override
    public String toString() {
        return String.format(
                "Group[id=%s, profileId=%s, taskLeaderId=%s, tasks(%s), lastUpdated=%s]",
                this.id,
                this.profileName,
                this.persons.toString(),
                this.taskGroups.toString()
        );
    }

    /**
     * We don't have to use the builder pattern here because the constructed class has only two String fields.
     * However, I use the builder pattern in this example because it makes the code a bit easier to read.
     */
    static class Builder {

        private String profileName;
        private List<String> persons;
        private List<String> taskGroups;

        private Builder() {}

        Builder profileName(String profileName) {
            this.profileName = profileName;
            return this;
        }

        Builder persons(List<String> persons) {
            this.persons = persons;
            return this;
        }

        Builder taskGroups(List<String> taskGroups) {
            this.taskGroups = taskGroups;
            return this;
        }

        Profile build() {
            Profile build = new Profile(this);

            return build;
        }
    }
}
