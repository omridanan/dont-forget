package com.javaadvent.bootrest.models.task;

import com.javaadvent.bootrest.error.RestErrorHandler;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.method.annotation.ExceptionHandlerMethodResolver;
import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver;
import org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod;

import java.lang.reflect.Method;
import java.nio.charset.Charset;
import java.util.Arrays;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.isEmptyOrNullString;
import static org.mockito.Matchers.isA;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(MockitoJUnitRunner.class)
public class TaskControllerTest {

    private static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8")
    );

    private static final String DESCRIPTION = "description";
    private static final String ID = "id";
    private static final String TITLE = "title";

    private static final int MAX_LENGTH_DESCRIPTION = 500;
    private static final int MAX_LENGTH_TITLE = 100;

    @Mock
    private TaskService service;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(new TaskController(service))
                .setHandlerExceptionResolvers(withExceptionControllerAdvice())
                .build();
    }

    /**
     * For some reason this does not work. The correct error handler method is invoked but when it tries
     * to return the validation errors as json, the following error appears to log:
     *
     * Failed to invoke @ExceptionHandler method:
     * public com.javaadvent.bootrest.error.ValidationErrorDTO com.javaadvent.bootrest.error.RestErrorHandler.processValidationError(org.springframework.web.bind.MethodArgumentNotValidException)
     * org.springframework.web.HttpMediaTypeNotAcceptableException: Could not find acceptable representation
     *
     * I have to figure out how to fix this before I can write the unit tests that ensure that validation is working.
     */
    private ExceptionHandlerExceptionResolver withExceptionControllerAdvice() {
        final ExceptionHandlerExceptionResolver exceptionResolver = new ExceptionHandlerExceptionResolver() {
            @Override
            protected ServletInvocableHandlerMethod getExceptionHandlerMethod(final HandlerMethod handlerMethod,
                                                                              final Exception exception) {
                Method method = new ExceptionHandlerMethodResolver(RestErrorHandler.class).resolveMethod(exception);
                if (method != null) {
                    ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
                    messageSource.setBasename("messages");
                    return new ServletInvocableHandlerMethod(new RestErrorHandler(messageSource), method);
                }
                return super.getExceptionHandlerMethod(handlerMethod, exception);
            }
        };
        exceptionResolver.afterPropertiesSet();
        return exceptionResolver;
    }

    @Test
    public void create_TaskEntryWithOnlyTitle_ShouldCreateNewTaskEntryWithoutDescription() throws Exception {
        TaskDTO newTaskEntry = new TaskDTOBuilder()
                .title(TITLE)
                .build();

        mockMvc.perform(post("/api/task")
                .contentType(APPLICATION_JSON_UTF8)
                .content(WebTestUtil.convertObjectToJsonBytes(newTaskEntry))
        );

        ArgumentCaptor<TaskDTO> createdArgument = ArgumentCaptor.forClass(TaskDTO.class);
        verify(service, times(1)).create(createdArgument.capture());
        verifyNoMoreInteractions(service);

        TaskDTO created = createdArgument.getValue();
        TaskDTOAssert.assertThatTaskDTO(created)
                .hasNoId()
                .hasTitle(TITLE)
                .hasNoDescription();
    }

    @Test
    public void create_TaskEntryWithOnlyTitle_ShouldReturnResponseStatusCreated() throws Exception {
        TaskDTO newTaskEntry = new TaskDTOBuilder()
                .title(TITLE)
                .build();

        when(service.create(isA(TaskDTO.class))).then(invocationOnMock -> {
            TaskDTO saved = (TaskDTO) invocationOnMock.getArguments()[0];
            saved.setId(ID);
            return saved;
        });

        mockMvc.perform(post("/api/task")
                .contentType(APPLICATION_JSON_UTF8)
                .content(WebTestUtil.convertObjectToJsonBytes(newTaskEntry))
        )
                .andExpect(status().isCreated());
    }

    @Test
    public void create_TaskEntryWithOnlyTitle_ShouldReturnTheInformationOfCreatedTaskEntryAsJSon() throws Exception {
        TaskDTO newTaskEntry = new TaskDTOBuilder()
                .title(TITLE)
                .build();

        when(service.create(isA(TaskDTO.class))).then(invocationOnMock -> {
            TaskDTO saved = (TaskDTO) invocationOnMock.getArguments()[0];
            saved.setId(ID);
            return saved;
        });

        mockMvc.perform(post("/api/task")
                .contentType(APPLICATION_JSON_UTF8)
                .content(WebTestUtil.convertObjectToJsonBytes(newTaskEntry))
        )
                .andExpect(content().contentType(APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.id", is(ID)))
                .andExpect(jsonPath("$.title", is(TITLE)))
                .andExpect(jsonPath("$.description", isEmptyOrNullString()));
    }

    @Test
    public void create_TaskEntryWithMaxLengthTitleAndDescription_ShouldCreateNewTaskEntryWithCorrectInformation() throws Exception {
        String maxLengthTitle = StringTestUtil.createStringWithLength(MAX_LENGTH_TITLE);
        String maxLengthDescription = StringTestUtil.createStringWithLength(MAX_LENGTH_DESCRIPTION);

        TaskDTO newTaskEntry = new TaskDTOBuilder()
                .title(maxLengthTitle)
                .description(maxLengthDescription)
                .build();

        mockMvc.perform(post("/api/task")
                .contentType(APPLICATION_JSON_UTF8)
                .content(WebTestUtil.convertObjectToJsonBytes(newTaskEntry))
        );

        ArgumentCaptor<TaskDTO> createdArgument = ArgumentCaptor.forClass(TaskDTO.class);
        verify(service, times(1)).create(createdArgument.capture());
        verifyNoMoreInteractions(service);

        TaskDTO created = createdArgument.getValue();
        TaskDTOAssert.assertThatTaskDTO(created)
                .hasNoId()
                .hasTitle(maxLengthTitle)
                .hasDescription(maxLengthDescription);
    }

    @Test
    public void create_TaskEntryWithMaxLengthTitleAndDescription_ShouldReturnResponseStatusCreated() throws Exception {
        String maxLengthTitle = StringTestUtil.createStringWithLength(MAX_LENGTH_TITLE);
        String maxLengthDescription = StringTestUtil.createStringWithLength(MAX_LENGTH_DESCRIPTION);

        TaskDTO newTaskEntry = new TaskDTOBuilder()
                .title(maxLengthTitle)
                .description(maxLengthDescription)
                .build();

        when(service.create(isA(TaskDTO.class))).then(invocationOnMock -> {
            TaskDTO saved = (TaskDTO) invocationOnMock.getArguments()[0];
            saved.setId(ID);
            return saved;
        });

        mockMvc.perform(post("/api/task")
                .contentType(APPLICATION_JSON_UTF8)
                .content(WebTestUtil.convertObjectToJsonBytes(newTaskEntry))
        )
                .andExpect(status().isCreated());
    }

    @Test
    public void create_TaskEntryWithMaxLengthTitleAndDescription_ShouldReturnTheInformationOfCreatedTaskEntryAsJson() throws Exception {
        String maxLengthTitle = StringTestUtil.createStringWithLength(MAX_LENGTH_TITLE);
        String maxLengthDescription = StringTestUtil.createStringWithLength(MAX_LENGTH_DESCRIPTION);

        TaskDTO newTaskEntry = new TaskDTOBuilder()
                .title(maxLengthTitle)
                .description(maxLengthDescription)
                .build();

        when(service.create(isA(TaskDTO.class))).then(invocationOnMock -> {
            TaskDTO saved = (TaskDTO) invocationOnMock.getArguments()[0];
            saved.setId(ID);
            return saved;
        });

        mockMvc.perform(post("/api/task")
                .contentType(APPLICATION_JSON_UTF8)
                .content(WebTestUtil.convertObjectToJsonBytes(newTaskEntry))
        )
                .andExpect(content().contentType(APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.id", is(ID)))
                .andExpect(jsonPath("$.title", is(maxLengthTitle)))
                .andExpect(jsonPath("$.description", is(maxLengthDescription)));
    }

    @Test
    public void delete_TaskEntryNotFound_ShouldReturnResponseStatusNotFound() throws Exception {
        when(service.delete(ID)).thenThrow(new TaskNotFoundException(ID));

        mockMvc.perform(delete("/api/task/{id}", ID))
                .andExpect(status().isNotFound());
    }

    @Test
    public void delete_TaskEntryFound_ShouldReturnResponseStatusOk() throws Exception {
        TaskDTO deleted = new TaskDTOBuilder()
                .id(ID)
                .build();

        when(service.delete(ID)).thenReturn(deleted);

        mockMvc.perform(delete("/api/task/{id}", ID))
                .andExpect(status().isOk());
    }

    @Test
    public void delete_TaskEntryFound_ShouldTheInformationOfDeletedTaskEntryAsJson() throws Exception {
        TaskDTO deleted = new TaskDTOBuilder()
                .id(ID)
                .title(TITLE)
                .description(DESCRIPTION)
                .build();

        when(service.delete(ID)).thenReturn(deleted);

        mockMvc.perform(delete("/api/task/{id}", ID))
                .andExpect(content().contentType(APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.id", is(ID)))
                .andExpect(jsonPath("$.title", is(TITLE)))
                .andExpect(jsonPath("$.description", is(DESCRIPTION)));
    }

    @Test
    public void findAll_ShouldReturnResponseStatusOk() throws Exception {
        mockMvc.perform(get("/api/task"))
                .andExpect(status().isOk());
    }

    @Test
    public void findAll_OneTaskEntryFound_ShouldReturnListThatContainsOneTaskEntryAsJson() throws Exception {
        TaskDTO found = new TaskDTOBuilder()
                .id(ID)
                .title(TITLE)
                .description(DESCRIPTION)
                .build();

        when(service.findAll()).thenReturn(Arrays.asList(found));

        mockMvc.perform(get("/api/task"))
                .andExpect(content().contentType(APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(ID)))
                .andExpect(jsonPath("$[0].title", is(TITLE)))
                .andExpect(jsonPath("$[0].description", is(DESCRIPTION)));
    }

    @Test
    public void findById_TaskEntryFound_ShouldReturnResponseStatusOk() throws Exception {
        TaskDTO found = new TaskDTOBuilder().build();

        when(service.findById(ID)).thenReturn(found);

        mockMvc.perform(get("/api/task/{id}", ID))
                .andExpect(status().isOk());
    }

    @Test
    public void findById_TaskEntryFound_ShouldTheInformationOfFoundTaskEntryAsJson() throws Exception {
        TaskDTO found = new TaskDTOBuilder()
                .id(ID)
                .title(TITLE)
                .description(DESCRIPTION)
                .build();

        when(service.findById(ID)).thenReturn(found);

        mockMvc.perform(get("/api/task/{id}", ID))
                .andExpect(content().contentType(APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.id", is(ID)))
                .andExpect(jsonPath("$.title", is(TITLE)))
                .andExpect(jsonPath("$.description", is(DESCRIPTION)));
    }

    @Test
    public void findById_TaskEntryNotFound_ShouldReturnResponseStatusNotFound() throws Exception {
        when(service.findById(ID)).thenThrow(new TaskNotFoundException(ID));

        mockMvc.perform(get("/api/task/{id}", ID))
                .andExpect(status().isNotFound());
    }

    @Test
    public void update_TaskEntryWithOnlyTitle_ShouldUpdateTheInformationOfTaskEntry() throws Exception {
        TaskDTO updatedTaskEntry = new TaskDTOBuilder()
                .id(ID)
                .title(TITLE)
                .build();

        mockMvc.perform(put("/api/task/{id}", ID)
                .contentType(APPLICATION_JSON_UTF8)
                .content(WebTestUtil.convertObjectToJsonBytes(updatedTaskEntry))
        );

        ArgumentCaptor<TaskDTO> updatedArgument = ArgumentCaptor.forClass(TaskDTO.class);
        verify(service, times(1)).update(updatedArgument.capture());
        verifyNoMoreInteractions(service);

        TaskDTO updated = updatedArgument.getValue();
        TaskDTOAssert.assertThatTaskDTO(updated)
                .hasId(ID)
                .hasTitle(TITLE)
                .hasNoDescription();
    }

    @Test
    public void update_TaskEntryWithOnlyTitle_ShouldReturnResponseStatusOk() throws Exception {
        TaskDTO updatedTaskEntry = new TaskDTOBuilder()
                .id(ID)
                .title(TITLE)
                .build();

        when(service.update(isA(TaskDTO.class))).then(invocationOnMock -> (TaskDTO) invocationOnMock.getArguments()[0]);

        mockMvc.perform(put("/api/task/{id}", ID)
                .contentType(APPLICATION_JSON_UTF8)
                .content(WebTestUtil.convertObjectToJsonBytes(updatedTaskEntry))
        )
                .andExpect(status().isOk());
    }

    @Test
    public void update_TaskEntryWithOnlyTitle_ShouldReturnTheInformationOfUpdatedTaskEntryAsJSon() throws Exception {
        TaskDTO updatedTaskEntry = new TaskDTOBuilder()
                .id(ID)
                .title(TITLE)
                .build();

        when(service.update(isA(TaskDTO.class))).then(invocationOnMock ->  (TaskDTO) invocationOnMock.getArguments()[0]);

        mockMvc.perform(put("/api/task/{id}", ID)
                .contentType(APPLICATION_JSON_UTF8)
                .content(WebTestUtil.convertObjectToJsonBytes(updatedTaskEntry))
        )
                .andExpect(content().contentType(APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.id", is(ID)))
                .andExpect(jsonPath("$.title", is(TITLE)))
                .andExpect(jsonPath("$.description", isEmptyOrNullString()));
    }

    @Test
    public void update_TaskEntryWithMaxLengthTitleAndDescription_ShouldUpdateTheInformationOfTaskEntry() throws Exception {
        String maxLengthTitle = StringTestUtil.createStringWithLength(MAX_LENGTH_TITLE);
        String maxLengthDescription = StringTestUtil.createStringWithLength(MAX_LENGTH_DESCRIPTION);

        TaskDTO updatedTaskEntry = new TaskDTOBuilder()
                .id(ID)
                .title(maxLengthTitle)
                .description(maxLengthDescription)
                .build();

        mockMvc.perform(put("/api/task/{id}", ID)
                .contentType(APPLICATION_JSON_UTF8)
                .content(WebTestUtil.convertObjectToJsonBytes(updatedTaskEntry))
        );

        ArgumentCaptor<TaskDTO> updatedArgument = ArgumentCaptor.forClass(TaskDTO.class);
        verify(service, times(1)).update(updatedArgument.capture());
        verifyNoMoreInteractions(service);

        TaskDTO updated = updatedArgument.getValue();
        TaskDTOAssert.assertThatTaskDTO(updated)
                .hasId(ID)
                .hasTitle(maxLengthTitle)
                .hasDescription(maxLengthDescription);
    }

    @Test
    public void update_TaskEntryWithMaxLengthTitleAndDescription_ShouldReturnResponseStatusOk() throws Exception {
        String maxLengthTitle = StringTestUtil.createStringWithLength(MAX_LENGTH_TITLE);
        String maxLengthDescription = StringTestUtil.createStringWithLength(MAX_LENGTH_DESCRIPTION);

        TaskDTO updatedTaskEntry = new TaskDTOBuilder()
                .id(ID)
                .title(maxLengthTitle)
                .description(maxLengthDescription)
                .build();

        when(service.create(isA(TaskDTO.class))).then(invocationOnMock -> (TaskDTO) invocationOnMock.getArguments()[0]);

        mockMvc.perform(put("/api/task/{id}", ID)
                .contentType(APPLICATION_JSON_UTF8)
                .content(WebTestUtil.convertObjectToJsonBytes(updatedTaskEntry))
        )
                .andExpect(status().isOk());
    }

    @Test
    public void update_TaskEntryWithMaxLengthTitleAndDescription_ShouldReturnTheInformationOfCreatedUpdatedTaskEntryAsJson() throws Exception {
        String maxLengthTitle = StringTestUtil.createStringWithLength(MAX_LENGTH_TITLE);
        String maxLengthDescription = StringTestUtil.createStringWithLength(MAX_LENGTH_DESCRIPTION);

        TaskDTO updatedTaskEntry = new TaskDTOBuilder()
                .id(ID)
                .title(maxLengthTitle)
                .description(maxLengthDescription)
                .build();

        when(service.update(isA(TaskDTO.class))).then(invocationOnMock -> (TaskDTO) invocationOnMock.getArguments()[0]);

        mockMvc.perform(put("/api/task/{id}", ID)
                .contentType(APPLICATION_JSON_UTF8)
                .content(WebTestUtil.convertObjectToJsonBytes(updatedTaskEntry))
        )
                .andExpect(content().contentType(APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.id", is(ID)))
                .andExpect(jsonPath("$.title", is(maxLengthTitle)))
                .andExpect(jsonPath("$.description", is(maxLengthDescription)));
    }
}
