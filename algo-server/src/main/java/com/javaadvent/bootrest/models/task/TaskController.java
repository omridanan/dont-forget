package com.javaadvent.bootrest.models.task;

import com.google.cloud.language.v1beta2.Entity;
import com.javaadvent.bootrest.services.GoogleNLPService;
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

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    private final TaskService service;
    private final GoogleNLPService googleNLPService;

    @Autowired
    TaskController(TaskService service, GoogleNLPService googleNLPService) {
        this.service = service;
        this.googleNLPService = googleNLPService;
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    TaskDTO create(@RequestBody @Valid TaskDTO taskEntry) {
        logger.info("Creating a new task entry with information: {}", taskEntry);

        TaskDTO created = service.create(taskEntry);
        logger.info("Created a new task entry with information: {}", created);

        return created;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    TaskDTO delete(@PathVariable("id") String id) {
        logger.info("Deleting task entry with id: {}", id);

        TaskDTO deleted = service.delete(id);
        logger.info("Deleted task entry with information: {}", deleted);

        return deleted;
    }

    @RequestMapping(method = RequestMethod.GET)
    List<TaskDTO> findAll() {
        logger.info("Finding all task entries");

        List<TaskDTO> taskEntries = service.findAll();
        logger.info("Found {} task entries", taskEntries.size());

        return taskEntries;
    }

    @RequestMapping(value = "/insert1", method = RequestMethod.GET )
    String insert1() {
        TaskDTO t = new TaskDTO();
        t.setContent("ASadasd");
        TaskDTO created = service.create(t);
        return "insert new task";
    }


    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    TaskDTO findById(@PathVariable("id") String id) {
        logger.info("Finding task entry with id: {}", id);

        TaskDTO taskEntry = service.findById(id);
        logger.info("Found task entry with information: {}", taskEntry);

        return taskEntry;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    TaskDTO update(@RequestBody @Valid TaskDTO taskEntry) {
        logger.info("Updating task entry with information: {}", taskEntry);

        TaskDTO updated = service.update(taskEntry);
        logger.info("Updated task entry with information: {}", updated);

        return updated;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleTaskNotFound(TaskNotFoundException ex) {
        logger.error("Handling error with message: {}", ex.getMessage());
    }

    @RequestMapping(value = "user/{user_id}/processTask/{task_id}", method = RequestMethod.GET)
    String processTask(@PathVariable("user_id") String userId, @PathVariable("task_id") String taskId) {
        logger.info("Finding task entry with id: {}", taskId);

        TaskDTO taskEntry = service.findById(taskId);
        logger.info("Found task entry with information: {}", taskEntry);

        List<Entity> taskEntities = googleNLPService.analyzeTextEntities(taskEntry.getContent());
        taskEntry.setEntities(taskEntities);
        TaskDTO updated = service.update(taskEntry);
        logger.info("Updated task entry with new entities: {}", updated);



        return "OK";
    }
}
