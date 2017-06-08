package com.javaadvent.bootrest.controllers;

import com.google.cloud.language.v1beta2.Entity;
import com.javaadvent.bootrest.models.group.Group;
import com.javaadvent.bootrest.models.group.GroupService;
import com.javaadvent.bootrest.models.person.Person;
import com.javaadvent.bootrest.models.person.PersonService;
import com.javaadvent.bootrest.models.profile.Profile;
import com.javaadvent.bootrest.models.profile.ProfileService;
import com.javaadvent.bootrest.models.task.Task;
import com.javaadvent.bootrest.models.task.TaskDTO;
import com.javaadvent.bootrest.models.task.TaskService;
import com.javaadvent.bootrest.services.TextSimilarityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by or.l on 6/8/17.
 */
@RestController
@RequestMapping("/api/processor")
public class ProcessorController {

    private static final Logger logger = LoggerFactory.getLogger(ProcessorController.class);

    private final TaskService taskService;
    private final GroupService groupService;
    private final PersonService personService;
    private final ProfileService profileService;
    private final TextSimilarityService textSimilarityService;
    private final int minTextSimilarityPercentage = 60; // TODO: take from properties file

    @Autowired
    public ProcessorController(TaskService taskService,
                               GroupService groupService,
                               PersonService personService,
                               ProfileService profileService,
                               TextSimilarityService textSimilarityService) {
        this.taskService = taskService;
        this.groupService = groupService;
        this.personService = personService;
        this.profileService = profileService;
        this.textSimilarityService = textSimilarityService;
    }

    @RequestMapping(value = "/person/connectTaskToGroup", method = RequestMethod.GET)
    String connectTaskToGroup(@RequestParam("person_id") String personId, @RequestParam("task_id") String taskId) {
        logger.info("Finding task entry with id: {}", taskId);
        TaskDTO taskEntry = taskService.findById(taskId);
        logger.info("Found task entry with information: {}", taskEntry);

        logger.info("Finding person entry with id: {}", personId);
        Person person = personService.findById(personId);
        logger.info("Found person entry with information: {}", person);

        for(String profileId : person.getProfiles()) {
            for(String groupId : profileService.findById(profileId).getTaskGroups()) {
                Group group = groupService.findById(groupId);
                //Task groupTaskLeader = taskService.findById(group.getTaskLeaderId());
            }
        }
        return "OK";
    }
}
