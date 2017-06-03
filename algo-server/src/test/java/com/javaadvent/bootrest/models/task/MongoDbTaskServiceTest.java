package com.javaadvent.bootrest.models.task;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.util.ReflectionTestUtils;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.javaadvent.bootrest.models.task.TaskAssert.assertThatTask;
import static com.javaadvent.bootrest.models.task.TaskDTOAssert.assertThatTaskDTO;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Matchers.isA;
import static org.mockito.Mockito.*;


@RunWith(MockitoJUnitRunner.class)
public class MongoDbTaskServiceTest {

    private static final String DESCRIPTION = "description";
    private static final String ID = "id";
    private static final String TITLE = "title";

    @Mock
    private TaskRepository repository;

    private MongoDBTaskServiceImp service;

    @Before
    public void setUp() {
        this.service = new MongoDBTaskServiceImp(repository);
    }

    @Test
    public void create_ShouldSaveNewTaskEntry() {
        TaskDTO newTask = new TaskDTOBuilder()
                .title(TITLE)
                .description(DESCRIPTION)
                .build();

        when(repository.save(isA(Task.class))).thenAnswer(invocation -> (Task) invocation.getArguments()[0]);

        service.create(newTask);

        ArgumentCaptor<Task> savedTaskArgument = ArgumentCaptor.forClass(Task.class);

        verify(repository, times(1)).save(savedTaskArgument.capture());
        verifyNoMoreInteractions(repository);

        Task savedTask = savedTaskArgument.getValue();
        assertThatTask(savedTask)
                .hasTitle(TITLE)
                .hasDescription(DESCRIPTION);
    }

    @Test
    public void create_ShouldReturnTheInformationOfCreatedTaskEntry() {
        TaskDTO newTask = new TaskDTOBuilder()
                .title(TITLE)
                .description(DESCRIPTION)
                .build();

        when(repository.save(isA(Task.class))).thenAnswer(invocation -> {
            Task persisted = (Task) invocation.getArguments()[0];
            ReflectionTestUtils.setField(persisted, "id", ID);
            return persisted;
        });

        TaskDTO returned = service.create(newTask);

        assertThatTaskDTO(returned)
                .hasId(ID)
                .hasTitle(TITLE)
                .hasDescription(DESCRIPTION);
    }

    @Test(expected = TaskNotFoundException.class)
    public void delete_TaskEntryNotFound_ShouldThrowException() {
        when(repository.findOne(ID)).thenReturn(Optional.empty());

        service.findById(ID);
    }

    @Test
    public void delete_TaskEntryFound_ShouldDeleteTheFoundTaskEntry() {
        Task deleted = new TaskBuilder()
                .id(ID)
                .build();

        when(repository.findOne(ID)).thenReturn(Optional.of(deleted));

        service.delete(ID);

        verify(repository, times(1)).delete(deleted);
    }

    @Test
    public void delete_TaskEntryFound_ShouldReturnTheDeletedTaskEntry() {
        Task deleted = new TaskBuilder()
                .id(ID)
                .title(TITLE)
                .description(DESCRIPTION)
                .build();

        when(repository.findOne(ID)).thenReturn(Optional.of(deleted));

        TaskDTO returned = service.delete(ID);

        assertThatTaskDTO(returned)
                .hasId(ID)
                .hasTitle(TITLE)
                .hasDescription(DESCRIPTION);
    }

    @Test
    public void findAll_OneTaskEntryFound_ShouldReturnTheInformationOfFoundTaskEntry() {
        Task expected = new TaskBuilder()
                .id(ID)
                .title(TITLE)
                .description(DESCRIPTION)
                .build();

        when(repository.findAll()).thenReturn(Arrays.asList(expected));

        List<TaskDTO> taskEntries = service.findAll();
        assertThat(taskEntries).hasSize(1);

        TaskDTO actual = taskEntries.iterator().next();
        assertThatTaskDTO(actual)
                .hasId(ID)
                .hasTitle(TITLE)
                .hasDescription(DESCRIPTION);
    }

    @Test(expected = TaskNotFoundException.class)
    public void findById_TaskEntryNotFound_ShouldThrowException() {
        when(repository.findOne(ID)).thenReturn(Optional.empty());

        service.findById(ID);
    }

    @Test
    public void findById_TaskEntryFound_ShouldReturnTheInformationOfFoundTaskEntry() {
        Task found = new TaskBuilder()
                .id(ID)
                .title(TITLE)
                .description(DESCRIPTION)
                .build();

        when(repository.findOne(ID)).thenReturn(Optional.of(found));

        TaskDTO returned = service.findById(ID);

        assertThatTaskDTO(returned)
                .hasId(ID)
                .hasTitle(TITLE)
                .hasDescription(DESCRIPTION);
    }

    @Test(expected = TaskNotFoundException.class)
    public void update_UpdatedTaskEntryNotFound_ShouldThrowException() {
        when(repository.findOne(ID)).thenReturn(Optional.empty());

        TaskDTO updated = new TaskDTOBuilder()
                .id(ID)
                .build();

        service.update(updated);
    }

    @Test
    public void update_UpdatedTaskEntryFound_ShouldSaveUpdatedTaskEntry() {
        Task existing = new TaskBuilder()
                .id(ID)
                .build();

        when(repository.findOne(ID)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(existing);

        TaskDTO updated = new TaskDTOBuilder()
                .id(ID)
                .title(TITLE)
                .description(DESCRIPTION)
                .build();

        service.update(updated);

        verify(repository, times(1)).save(existing);
        assertThatTask(existing)
                .hasId(ID)
                .hasTitle(TITLE)
                .hasDescription(DESCRIPTION);
    }

    @Test
    public void update_UpdatedTaskEntryFound_ShouldReturnTheInformationOfUpdatedTaskEntry() {
        Task existing = new TaskBuilder()
                .id(ID)
                .build();

        when(repository.findOne(ID)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(existing);

        TaskDTO updated = new TaskDTOBuilder()
                .id(ID)
                .title(TITLE)
                .description(DESCRIPTION)
                .build();

        TaskDTO returned = service.update(updated);
        assertThatTaskDTO(returned)
                .hasId(ID)
                .hasTitle(TITLE)
                .hasDescription(DESCRIPTION);
    }
}
