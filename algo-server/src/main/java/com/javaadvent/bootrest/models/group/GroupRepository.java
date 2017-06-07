package com.javaadvent.bootrest.models.group;

import com.javaadvent.bootrest.models.task.Task;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

/**
 * This repository provides CRUD operations for {@link Group}
 * objects.
 */
public interface GroupRepository extends Repository<Group, String> {

    /**
     * Deletes a group entry from the database.
     * @param deleted   The deleted group entry.
     */
    void delete(Group deleted);

    /**
     * Finds all group entries from the database.
     * @return  The information of all group entries that are found from the database.
     */
    List<Group> findAll();

    /**
     * Finds the information of a single group entry.
     * @param id    The id of the requested task entry.
     * @return      The information of the found group entry. If no group entry
     *              is found, this method returns an empty {@link Optional} object.
     */
    Optional<Group> findOne(String id);

    /**
     * Saves a new task entry to the database.
     * @param saved The information of the saved task entry.
     * @return      The information of the saved task entry.
     */
    Group save(Group saved);
}
