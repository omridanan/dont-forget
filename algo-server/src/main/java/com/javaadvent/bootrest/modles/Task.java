package com.javaadvent.bootrest.modles;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by or.l on 5/31/17.
 */

@Document(collection = "alltasks")
public class Task {

    @Id
    private int id;

    private String title;

    // Getters & Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
