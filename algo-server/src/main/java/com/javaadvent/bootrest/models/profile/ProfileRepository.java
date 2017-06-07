package com.javaadvent.bootrest.models.profile;

import com.javaadvent.bootrest.models.person.Person;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

/**
 * This repository provides CRUD operations for {@link Profile}
 * objects.
 */
public interface ProfileRepository extends Repository<Profile, String> {

    /**
     * Deletes a task entry from the database.
     * @param deleted   The deleted task entry.
     */
    void delete(Profile deleted);

    /**
     * Finds all task entries from the database.
     * @return  The information of all task entries that are found from the database.
     */
    List<Profile> findAll();

    /**
     * Finds the information of a single task entry.
     * @param id    The id of the requested task entry.
     * @return      The information of the found task entry. If no task entry
     *              is found, this method returns an empty {@link Optional} object.
     */
    Optional<Profile> findOne(String id);

    /**
     * Saves a new task entry to the database.
     * @param saved The information of the saved task entry.
     * @return      The information of the saved task entry.
     */
    Profile save(Profile saved);
}
