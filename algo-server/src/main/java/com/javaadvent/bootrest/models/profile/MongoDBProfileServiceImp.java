package com.javaadvent.bootrest.models.profile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

/**
 * This service class saves {@link Profile} objects
 * to MongoDB database.
 */
@Service
public final class MongoDBProfileServiceImp implements ProfileService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MongoDBProfileServiceImp.class);

    private final ProfileRepository repository;

    @Autowired
    MongoDBProfileServiceImp(ProfileRepository repository) {
        this.repository = repository;
    }

    @Override
    public Profile create(Profile profile) {
        LOGGER.info("Creating a new profile entry with information: {}", profile);

        profile = repository.save(profile);
        LOGGER.info("Created a new profile entry with information: {}", profile);

        return profile;
    }

    @Override
    public Profile delete(String id) {
        LOGGER.info("Deleting a profile entry with id: {}", id);

        Profile deleted = findProfileById(id);
        repository.delete(deleted);

        LOGGER.info("Deleted profile entry with informtation: {}", deleted);

        return deleted;
    }

    @Override
    public List<Profile> findAll() {
        LOGGER.info("Finding all profile entries.");

        List<Profile> profileEntries = repository.findAll();

        LOGGER.info("Found {} profile entries", profileEntries.size());

        return profileEntries;
    }



    @Override
    public Profile findById(String id) {
        LOGGER.info("Finding profile entry with id: {}", id);

        Profile found = findProfileById(id);

        LOGGER.info("Found profile entry: {}", found);

        return found;
    }

    @Override
    public Profile update(Profile profile) {
        LOGGER.info("Updating profile entry with information: {}", profile);

        Profile updated = findProfileById(profile.getId());
        updated.update(profile.getProfileName(), profile.getPersons(), profile.getTaskGroups());
        updated = repository.save(updated);

        LOGGER.info("Updated profile entry with information: {}", updated);

        return updated;
    }

    private Profile findProfileById(String id) {
        Optional<Profile> result = repository.findOne(id);
        return result.orElseThrow(() -> new ProfileNotFoundException(id));

    }
}
