package com.javaadvent.bootrest.modles;

import java.util.List;

/**
 * Created by or.l on 5/31/17.
 */
public interface TaskRepositoryCustom {

    String getCollectionName();

    List<Task> getAll();
}
