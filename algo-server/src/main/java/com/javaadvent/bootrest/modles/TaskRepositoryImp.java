package com.javaadvent.bootrest.modles;

import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;

/**
 * Created by or.l on 5/31/17.
 */
public class TaskRepositoryImp implements TaskRepositoryCustom{

    private static String collectionName = "alltasks";
    private MongoTemplate mongoTemplate;

    public TaskRepositoryImp(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public String getCollectionName() {
        return collectionName;
    }

    @Override
    public List<Task> getAll() {
        return mongoTemplate.findAll(Task.class, getCollectionName());
    }

    public void insert(Task task){
        mongoTemplate.insert(task, getCollectionName());
    }
}
