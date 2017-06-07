package com.javaadvent.bootrest.models.task;

/**
 * This exception is thrown when the requested task entry is not found.
 */
public class TaskNotFoundException extends RuntimeException {

    public TaskNotFoundException(String id) {
        super(String.format("No task entry found with id: <%s>", id));
    }
}
