package com.javaadvent.bootrest.services;


import java.util.List;

/**
 * Created by or.l on 6/4/17.
 */
public interface NLPService {
    List<String> getTextEntities(String text);
}
