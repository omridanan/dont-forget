package com.javaadvent.bootrest.models.profile;

import com.javaadvent.bootrest.models.profile.Profile;
import com.javaadvent.bootrest.models.task.TaskDTO;

import java.util.List;

/**
 * This interface declares the methods that provides CRUD operations for task
 */
public interface ProfileService {

    /**
     * Creates a new task entry.
     * @param profile The information of the created task entry.
     * @return      The information of the created task entry.
     */
    Profile create(Profile profile);

    /**
     * Deletes a task entry.
     * @param id    The id of the deleted task entry.
     * @return      THe information of the deleted task entry.
     * @throws com.javaadvent.bootrest.models.profile.ProfileNotFoundException if no task entry is found.
     */
    Profile delete(String id);

    /**
     * Finds all task entries.
     * @return      The information of all task entries.
     */
    List<Profile> findAll();

    /**
     * Finds a single task entry.
     * @param id    The id of the requested task entry.
     * @return      The information of the requested task entry.
     * @throws com.javaadvent.bootrest.models.profile.ProfileNotFoundException if no task entry is found.
     */
    Profile findById(String id);

    /**
     * Updates the information of a task entry.
     * @param profile  The information of the updated task entry.
     * @return      The information of the updated task entry.
     * @throws com.javaadvent.bootrest.models.profile.ProfileNotFoundException if no task entry is found.
     */
    Profile update(Profile profile);
}
