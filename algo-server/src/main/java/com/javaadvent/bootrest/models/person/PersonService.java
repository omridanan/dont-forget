package com.javaadvent.bootrest.models.person;

import com.javaadvent.bootrest.models.person.Person;
import com.javaadvent.bootrest.models.profile.Profile;

import java.util.List;

/**
 * This interface declares the methods that provides CRUD operations for task
 */
public interface PersonService {

    /**
     * Creates a new task entry.
     * @param person The information of the created task entry.
     * @return      The information of the created task entry.
     */
    Person create(Person person);

    /**
     * Deletes a task entry.
     * @param id    The id of the deleted task entry.
     * @return      THe information of the deleted task entry.
     * @throws com.javaadvent.bootrest.models.person.PersonNotFoundException if no task entry is found.
     */
    Person delete(String id);

    /**
     * Finds all task entries.
     * @return      The information of all task entries.
     */
    List<Person> findAll();

    /**
     * Finds a single task entry.
     * @param id    The id of the requested task entry.
     * @return      The information of the requested task entry.
     * @throws com.javaadvent.bootrest.models.person.PersonNotFoundException if no task entry is found.
     */
    Person findById(String id);

    /**
     * Updates the information of a task entry.
     * @param person  The information of the updated task entry.
     * @return      The information of the updated task entry.
     * @throws com.javaadvent.bootrest.models.person.PersonNotFoundException if no task entry is found.
     */
    Person update(Person person);
}
