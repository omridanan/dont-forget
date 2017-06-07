package com.javaadvent.bootrest.models.group;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * This service class saves {@link Group} objects
 * to MongoDB database.
 */
@Service
public final class MongoDBGroupServiceImp implements GroupService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MongoDBGroupServiceImp.class);

    private final GroupRepository repository;

    @Autowired
    MongoDBGroupServiceImp(GroupRepository repository) {
        this.repository = repository;
    }

    @Override
    public Group create(Group group) {
        LOGGER.info("Creating a new group entry with information: {}", group);

        group = repository.save(group);
        LOGGER.info("Created a new group entry with information: {}", group);

        return group;
    }

    @Override
    public Group delete(String id) {
        LOGGER.info("Deleting a group entry with id: {}", id);

        Group deleted = findGroupById(id);
        repository.delete(deleted);

        LOGGER.info("Deleted group entry with informtation: {}", deleted);

        return deleted;
    }

    @Override
    public List<Group> findAll() {
        LOGGER.info("Finding all group entries.");

        List<Group> groupEntries = repository.findAll();

        LOGGER.info("Found {} group entries", groupEntries.size());

        return groupEntries;
    }



    @Override
    public Group findById(String id) {
        LOGGER.info("Finding group entry with id: {}", id);

        Group found = findGroupById(id);

        LOGGER.info("Found group entry: {}", found);

        return found;
    }

    @Override
    public Group update(Group group) {
        LOGGER.info("Updating group entry with information: {}", group);

        Group updated = findGroupById(group.getId());
        updated.update(group.getProfileId(),
                        group.getTaskLeaderId(),
                        group.getTasks(),
                        group.getLastUpdated());

        updated = repository.save(updated);

        LOGGER.info("Updated group entry with information: {}", updated);

        return updated;
    }

    private Group findGroupById(String id) {
        Optional<Group> result = repository.findOne(id);
        return result.orElseThrow(() -> new GroupNotFoundException(id));

    }
}
