package com.javaadvent.bootrest.models.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * This controller provides the public API that is used to manage the information
 * of task entries.
 */
@RestController
@RequestMapping("/api/task")
final class TaskController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TaskController.class);

    private final TaskService service;

    @Autowired
    TaskController(TaskService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    TaskDTO create(@RequestBody @Valid TaskDTO taskEntry) {
        LOGGER.info("Creating a new task entry with information: {}", taskEntry);

        TaskDTO created = service.create(taskEntry);
        LOGGER.info("Created a new task entry with information: {}", created);

        return created;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    TaskDTO delete(@PathVariable("id") String id) {
        LOGGER.info("Deleting task entry with id: {}", id);

        TaskDTO deleted = service.delete(id);
        LOGGER.info("Deleted task entry with information: {}", deleted);

        return deleted;
    }

    @RequestMapping(method = RequestMethod.GET)
    List<TaskDTO> findAll() {
        LOGGER.info("Finding all task entries");

        List<TaskDTO> taskEntries = service.findAll();
        LOGGER.info("Found {} task entries", taskEntries.size());

        return taskEntries;
    }

    @RequestMapping(value = "/insert1", method = RequestMethod.GET )
    String insert1() {
        TaskDTO t = new TaskDTO();
        t.setTitle("ASadasd");
        t.setDescription("desctiprtion");
        TaskDTO created = service.create(t);
        return "insert new task";
    }


    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    TaskDTO findById(@PathVariable("id") String id) {
        LOGGER.info("Finding task entry with id: {}", id);

        TaskDTO taskEntry = service.findById(id);
        LOGGER.info("Found task entry with information: {}", taskEntry);

        return taskEntry;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    TaskDTO update(@RequestBody @Valid TaskDTO taskEntry) {
        LOGGER.info("Updating task entry with information: {}", taskEntry);

        TaskDTO updated = service.update(taskEntry);
        LOGGER.info("Updated task entry with information: {}", updated);

        return updated;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleTaskNotFound(TaskNotFoundException ex) {
        LOGGER.error("Handling error with message: {}", ex.getMessage());
    }
}
