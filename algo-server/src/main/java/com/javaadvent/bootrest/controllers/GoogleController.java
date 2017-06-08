package com.javaadvent.bootrest.controllers;

import com.google.cloud.language.v1beta2.Entity;
import com.google.cloud.language.v1beta2.Sentiment;
import com.javaadvent.bootrest.services.GoogleNLPService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * This controller provides the public API that is used to manage the information
 * of task entries.
 */
@RestController
@RequestMapping("/api/googlenlp")
public final class GoogleController {

    private static final Logger logger = LoggerFactory.getLogger(GoogleController.class);

    private final GoogleNLPService googleNLPService;

    @Autowired
    public GoogleController(GoogleNLPService googleNLPService) {
        this.googleNLPService = googleNLPService;
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET )
    List<String> getEntities() {
        return googleNLPService.getTextEntities("Grant of release from the army");
    }

    @RequestMapping(value = "/test1", method = RequestMethod.GET )
    List<String> getEntities1() {
        return googleNLPService.getTextEntities("go play football");
    }

    @RequestMapping(value = "/test2", method = RequestMethod.GET )
    List<String> getEntities2() {
        return googleNLPService.getTextEntities("go playing football");
    }

    @RequestMapping(value = "/test22", method = RequestMethod.GET )
    String getEntities22() {
        Sentiment sentiment = googleNLPService.analyzeSentimentText("go playing football");

        return sentiment.toString();
    }

    @RequestMapping(value = "/test222", method = RequestMethod.GET, produces = "application/json")
    List<Entity> getEntities222() {
        return googleNLPService.analyzeTextEntities("go playing football");
    }

    @RequestMapping(value = "/test3", method = RequestMethod.GET )
    List<String> getEntities3() {
        return googleNLPService.getTextEntities("go to play football");
    }

    @RequestMapping(value = "/test33", method = RequestMethod.GET )
    String getEntities33() {
        Sentiment sentiment = googleNLPService.analyzeSentimentText("go to play football");

        return sentiment.toString();
    }

    @RequestMapping(value = "/test333", method = RequestMethod.GET, produces = "application/json")
    List<Entity> getEntities333() {
        return googleNLPService.analyzeTextEntities("go to play football");
    }

    @RequestMapping(value = "/test4", method = RequestMethod.GET )
    List<String> getEntities4() {
        return googleNLPService.getTextEntities("Make an appointment with the family doctor");
    }

    @RequestMapping(value = "/test5", method = RequestMethod.GET )
    List<String> getEntities5() {
        return googleNLPService.getTextEntities("Go to the family doctor for examination");
    }

    @RequestMapping(value = "/test6", method = RequestMethod.GET )
    String getEntities6() {
        Sentiment sentiment = googleNLPService.analyzeSentimentText("Make an appointment with the family doctor");

        return sentiment.toString();
    }

    @RequestMapping(value = "/test7", method = RequestMethod.GET )
    String getEntities7() {
        Sentiment sentiment = googleNLPService.analyzeSentimentText("Go to the family doctor for examination");

        return sentiment.toString();
    }

    @RequestMapping(value = "/test8", method = RequestMethod.GET )
    List<String> getEntities8() {
        return googleNLPService.getTextEntities("Go to the family doctor for examination");
    }


    @RequestMapping(value = "/test9", method = RequestMethod.GET )
    List<String> getEntities9() {
        return googleNLPService.getTextEntities("make an appointment with my best of the family doctor on sunday");
    }
}
