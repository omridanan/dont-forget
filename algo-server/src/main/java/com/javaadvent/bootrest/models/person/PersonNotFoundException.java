package com.javaadvent.bootrest.models.person;

/**
 * This exception is thrown when the requested profile entry is not found.
 */
public class PersonNotFoundException extends RuntimeException {

    public PersonNotFoundException(String id) {
        super(String.format("No person entry found with id: <%s>", id));
    }
}
