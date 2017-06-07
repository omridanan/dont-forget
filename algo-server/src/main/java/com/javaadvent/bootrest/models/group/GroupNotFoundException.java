package com.javaadvent.bootrest.models.group;

/**
 * This exception is thrown when the requested profile entry is not found.
 */
public class GroupNotFoundException extends RuntimeException {

    public GroupNotFoundException(String id) {
        super(String.format("No group entry found with id: <%s>", id));
    }
}
