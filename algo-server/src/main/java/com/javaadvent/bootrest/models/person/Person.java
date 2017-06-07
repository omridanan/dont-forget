package com.javaadvent.bootrest.models.person;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * represent the task objet in mongo tasks collection
 */
@Document(collection = "persons")
public final class Person {

    @Id
    private String id;
    private String facebookId;
    private String firstName;
    private String lastName;
    private String birthday;
    private String email;
    private String gender;
    private List<String> profiles;

    public Person() {}

    private Person(Builder builder) {
        this.facebookId = builder.facebookId;
    }

    public String getFacebookId() {
        return facebookId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getBirthday() {
        return birthday;
    }

    public String getEmail() {
        return email;
    }

    public String getGender() {
        return gender;
    }

    public List<String> getProfiles() {
        return profiles;
    }

    static Builder getBuilder() {
        return new Builder();
    }

    public String getId() {
        return id;
    }


    public void update(String facebookId,
                       String firstName,
                       String lastName,
                       String birthday,
                       String email,
                       String gender,
                       List<String> profiles) {
        this.facebookId = facebookId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.email = email;
        this.gender = gender;
        this.profiles = profiles;
    }

    @Override
    public String toString() {
        return String.format(
                "Person[id=%s, facebookId=%s, firstName=%s, lastName=%s, birthday=%s, email=%s, gender=%s, profiles(%s)]",
                this.id,
                this.facebookId,
                this.firstName,
                this.lastName,
                this.birthday,
                this.email,
                this.gender,
                this.profiles.toString()
        );
    }

    /**
     * We don't have to use the builder pattern here because the constructed class has only two String fields.
     * However, I use the builder pattern in this example because it makes the code a bit easier to read.
     */
    static class Builder {

        private String facebookId;
        private String firstName;
        private String lastName;
        private String birthday;
        private String email;
        private String gender;
        private List<String> profiles;

        private Builder() {}

        Builder facebookId(String facebookId) {
            this.facebookId = facebookId;
            return this;
        }

        Builder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        Builder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        Builder birthday(String birthday) {
            this.birthday = birthday;
            return this;
        }

        Builder email(String email) {
            this.email = email;
            return this;
        }

        Builder gender(String gender) {
            this.gender = gender;
            return this;
        }

        Builder profiles(List<String> profiles) {
            this.profiles = profiles;
            return this;
        }

        Person build() {
            Person build = new Person(this);

            return build;
        }
    }
}
