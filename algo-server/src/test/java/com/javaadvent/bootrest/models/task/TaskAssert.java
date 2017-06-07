package com.javaadvent.bootrest.models.task;

import org.assertj.core.api.AbstractAssert;

import static org.assertj.core.api.Assertions.assertThat;

class TaskAssert extends AbstractAssert<TaskAssert, Task> {

    private TaskAssert(Task actual) {
        super(actual, TaskAssert.class);
    }

    static TaskAssert assertThatTask(Task actual) {
        return new TaskAssert(actual);
    }

    TaskAssert hasContent(String expectedContent) {
        isNotNull();

        String actualContent = actual.getContent();
        assertThat(actualContent)
                .overridingErrorMessage("Expected description to be <%s> but was <%s>",
                        expectedContent,
                        actualContent
                )
                .isEqualTo(expectedContent);

        return this;
    }

    TaskAssert hasId(String expectedId) {
        isNotNull();

        String actualId = actual.getId();
        assertThat(actualId)
                .overridingErrorMessage("Expected id to be <%s> but was <%s>",
                        expectedId,
                        actualId
                )
                .isEqualTo(expectedId);

        return this;
    }

    TaskAssert hasNoContent() {
        isNotNull();

        String actualContent = actual.getContent();
        assertThat(actualContent)
                .overridingErrorMessage("Expected description to be <null> but was <%s>", actualContent)
                .isNull();

        return this;
    }

    TaskAssert hasNoId() {
        isNotNull();

        String actualId = actual.getId();
        assertThat(actualId)
                .overridingErrorMessage("Expected id to be <null> but was <%s>", actualId)
                .isNull();

        return this;
    }
}
