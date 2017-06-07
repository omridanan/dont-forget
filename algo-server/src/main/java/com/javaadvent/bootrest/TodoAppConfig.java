package com.javaadvent.bootrest;

import com.google.cloud.language.spi.v1beta2.LanguageServiceClient;
import com.javaadvent.bootrest.models.task.GoogleController;
import com.javaadvent.bootrest.services.GoogleNLPService;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by or.l on 6/3/17.
 */
@Configuration
public class TodoAppConfig {

    protected String getDatabaseName() {
        return "dont-forget";
    }

    @Bean
    public Mongo mongo() throws Exception {
        List<MongoCredential> credentials = new ArrayList<>();
        credentials.add(MongoCredential.createScramSha1Credential("admin", getDatabaseName(), "admin".toCharArray()));

        return new MongoClient(new ServerAddress("ds143071.mlab.com", 43071), credentials);
    }

    @Bean
    public MongoTemplate mongoTemplate() throws Exception {
        return new MongoTemplate(mongo(), getDatabaseName());
    }

    @Bean
    public LanguageServiceClient languageServiceClient() throws IOException {
        return LanguageServiceClient.create();
    }

    @Bean
    public GoogleNLPService googleNLPService(LanguageServiceClient languageServiceClient) {
        return new GoogleNLPService(languageServiceClient);
    }

    @Bean
    public GoogleController googleController(GoogleNLPService googleNLPService){
        return new GoogleController(googleNLPService);
    }
}
