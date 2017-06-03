package com.javaadvent.bootrest.models.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

/**
 * This service class saves {@link Task} objects
 * to MongoDB database.
 */
@Service
public final class MongoDBTaskServiceImp implements TaskService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MongoDBTaskServiceImp.class);

    private final TaskRepository repository;

    @Autowired
    MongoDBTaskServiceImp(TaskRepository repository) {
        this.repository = repository;
    }

    @Override
    public TaskDTO create(TaskDTO task) {
        LOGGER.info("Creating a new task entry with information: {}", task);

        Task persisted = Task.getBuilder()
                .title(task.getTitle())
                .description(task.getDescription())
                .build();

        persisted = repository.save(persisted);
        LOGGER.info("Created a new task entry with information: {}", persisted);

        return convertToDTO(persisted);
    }

    @Override
    public TaskDTO delete(String id) {
        LOGGER.info("Deleting a task entry with id: {}", id);

        Task deleted = findTaskById(id);
        repository.delete(deleted);

        LOGGER.info("Deleted task entry with informtation: {}", deleted);

        return convertToDTO(deleted);
    }

    @Override
    public List<TaskDTO> findAll() {
        LOGGER.info("Finding all task entries.");

        List<Task> taskEntries = repository.findAll();

        LOGGER.info("Found {} task entries", taskEntries.size());

        return convertToDTOs(taskEntries);
    }

    private List<TaskDTO> convertToDTOs(List<Task> models) {
        return models.stream()
                .map(this::convertToDTO)
                .collect(toList());
    }

    @Override
    public TaskDTO findById(String id) {
        LOGGER.info("Finding task entry with id: {}", id);

        Task found = findTaskById(id);

        LOGGER.info("Found task entry: {}", found);

        return convertToDTO(found);
    }

    @Override
    public TaskDTO update(TaskDTO task) {
        LOGGER.info("Updating task entry with information: {}", task);

        Task updated = findTaskById(task.getId());
        updated.update(task.getTitle(), task.getDescription());
        updated = repository.save(updated);

        LOGGER.info("Updated task entry with information: {}", updated);

        return convertToDTO(updated);
    }

    private Task findTaskById(String id) {
        Optional<Task> result = repository.findOne(id);
        return result.orElseThrow(() -> new TaskNotFoundException(id));

    }

    private TaskDTO convertToDTO(Task model) {
        TaskDTO dto = new TaskDTO();

        dto.setId(model.getId());
        dto.setTitle(model.getTitle());
        dto.setDescription(model.getDescription());

        return dto;
    }
}
