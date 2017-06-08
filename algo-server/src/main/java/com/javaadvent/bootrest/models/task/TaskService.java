package com.javaadvent.bootrest.models.task;

import java.util.List;

/**
 * This interface declares the methods that provides CRUD operations for task
 */
public interface TaskService {

    /**
     * Creates a new task entry.
     * @param task The information of the created task entry.
     * @return      The information of the created task entry.
     */
    TaskDTO create(TaskDTO task);

    /**
     * Deletes a task entry.
     * @param id    The id of the deleted task entry.
     * @return      THe information of the deleted task entry.
     * @throws com.javaadvent.bootrest.models.task.TaskNotFoundException if no task entry is found.
     */
    TaskDTO delete(String id);

    /**
     * Finds all task entries.
     * @return      The information of all task entries.
     */
    List<TaskDTO> findAll();

    /**
     * Finds a single task entry.
     * @param id    The id of the requested task entry.
     * @return      The information of the requested task entry.
     * @throws com.javaadvent.bootrest.models.task.TaskNotFoundException if no task entry is found.
     */
    TaskDTO findById(String id);

    /**
     * Updates the information of a task entry.
     * @param task  The information of the updated task entry.
     * @return      The information of the updated task entry.
     * @throws com.javaadvent.bootrest.models.task.TaskNotFoundException if no task entry is found.
     */
    TaskDTO update(TaskDTO task);
}
