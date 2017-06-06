package com.javaadvent.bootrest.models.task;

import com.google.cloud.language.v1beta2.Sentiment;
import com.javaadvent.bootrest.services.GoogleNLPService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    @RequestMapping(value = "/test3", method = RequestMethod.GET )
    List<String> getEntities3() {
        return googleNLPService.getTextEntities("go to play football");
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
}
