package com.javaadvent.bootrest.models.person;

import com.javaadvent.bootrest.models.task.Task;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

/**
 * This repository provides CRUD operations for {@link Person}
 * objects.
 */
public interface PersonRepository extends Repository<Person, String> {

    /**
     * Deletes a task entry from the database.
     * @param deleted   The deleted task entry.
     */
    void delete(Person deleted);

    /**
     * Finds all task entries from the database.
     * @return  The information of all task entries that are found from the database.
     */
    List<Person> findAll();

    /**
     * Finds the information of a single task entry.
     * @param id    The id of the requested task entry.
     * @return      The information of the found task entry. If no task entry
     *              is found, this method returns an empty {@link Optional} object.
     */
    Optional<Person> findOne(String id);

    /**
     * Saves a new task entry to the database.
     * @param saved The information of the saved task entry.
     * @return      The information of the saved task entry.
     */
    Person save(Person saved);
}
