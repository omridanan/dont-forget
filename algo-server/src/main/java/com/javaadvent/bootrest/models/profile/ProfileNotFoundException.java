package com.javaadvent.bootrest.models.profile;

/**
 * This exception is thrown when the requested profile entry is not found.
 */
public class ProfileNotFoundException extends RuntimeException {

    public ProfileNotFoundException(String id) {
        super(String.format("No profile entry found with id: <%s>", id));
    }
}
