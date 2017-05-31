package com.javaadvent.bootrest.todo;

import com.javaadvent.bootrest.modles.Task;
import com.javaadvent.bootrest.modles.TaskRepositoryImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by or.l on 5/31/17.
 */
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private TaskRepositoryImp taskRepositoryImp;

    @Autowired
    public TaskController(TaskRepositoryImp taskRepositoryImp){
        this.taskRepositoryImp = taskRepositoryImp;
    }

    @RequestMapping("/all")
    public List<Task> getAllTasks() {
        return taskRepositoryImp.getAll();
    }

    @RequestMapping("/insert1")
    public void insertTask() {
        Task t1 = new Task();
        t1.setId(11);
        t1.setTitle("new task 11");
        taskRepositoryImp.insert(t1);
    }
}
