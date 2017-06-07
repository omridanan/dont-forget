package com.javaadvent.bootrest.models.person;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * This service class saves {@link Person} objects
 * to MongoDB database.
 */
@Service
public final class MongoDBPersonServiceImp implements PersonService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MongoDBPersonServiceImp.class);

    private final PersonRepository repository;

    @Autowired
    MongoDBPersonServiceImp(PersonRepository repository) {
        this.repository = repository;
    }

    @Override
    public Person create(Person person) {
        LOGGER.info("Creating a new person entry with information: {}", person);

        person = repository.save(person);
        LOGGER.info("Created a new person entry with information: {}", person);

        return person;
    }

    @Override
    public Person delete(String id) {
        LOGGER.info("Deleting a person entry with id: {}", id);

        Person deleted = findPersonById(id);
        repository.delete(deleted);

        LOGGER.info("Deleted person entry with informtation: {}", deleted);

        return deleted;
    }

    @Override
    public List<Person> findAll() {
        LOGGER.info("Finding all person entries.");

        List<Person> personEntries = repository.findAll();

        LOGGER.info("Found {} person entries", personEntries.size());

        return personEntries;
    }



    @Override
    public Person findById(String id) {
        LOGGER.info("Finding person entry with id: {}", id);

        Person found = findPersonById(id);

        LOGGER.info("Found person entry: {}", found);

        return found;
    }

    @Override
    public Person update(Person person) {
        LOGGER.info("Updating person entry with information: {}", person);

        Person updated = findPersonById(person.getId());
        updated.update(person.getFacebookId(),
                        person.getFirstName(),
                        person.getLastName(),
                        person.getBirthday(),
                        person.getEmail(),
                        person.getGender(),
                        person.getProfiles());

        updated = repository.save(updated);

        LOGGER.info("Updated person entry with information: {}", updated);

        return updated;
    }

    private Person findPersonById(String id) {
        Optional<Person> result = repository.findOne(id);
        return result.orElseThrow(() -> new PersonNotFoundException(id));

    }
}
