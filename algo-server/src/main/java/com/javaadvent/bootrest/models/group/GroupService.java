package com.javaadvent.bootrest.models.group;

import com.javaadvent.bootrest.models.person.Person;

import java.util.List;

/**
 * This interface declares the methods that provides CRUD operations for task
 */
interface GroupService {

    /**
     * Creates a new task entry.
     * @param group The information of the created task entry.
     * @return      The information of the created task entry.
     */
    Group create(Group group);

    /**
     * Deletes a task entry.
     * @param id    The id of the deleted task entry.
     * @return      THe information of the deleted task entry.
     * @throws com.javaadvent.bootrest.models.group.GroupNotFoundException if no task entry is found.
     */
    Group delete(String id);

    /**
     * Finds all task entries.
     * @return      The information of all task entries.
     */
    List<Group> findAll();

    /**
     * Finds a single task entry.
     * @param id    The id of the requested task entry.
     * @return      The information of the requested task entry.
     * @throws com.javaadvent.bootrest.models.group.GroupNotFoundException if no task entry is found.
     */
    Group findById(String id);

    /**
     * Updates the information of a task entry.
     * @param group  The information of the updated task entry.
     * @return      The information of the updated task entry.
     * @throws com.javaadvent.bootrest.models.group.GroupNotFoundException if no task entry is found.
     */
    Group update(Group group);
}
