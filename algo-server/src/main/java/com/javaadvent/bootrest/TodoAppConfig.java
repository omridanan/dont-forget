package com.javaadvent.bootrest;

import com.javaadvent.bootrest.modles.TaskRepositoryImp;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * This configuration class has three responsibilities:
 * <ol>
 *     <li>It enables the auto configuration of the Spring application context.</li>
 *     <li>
 *         It ensures that Spring looks for other components (controllers, services, and repositories) from the
 *         <code>com.javaadvent.bootrest.todo</code> package.
 *     </li>
 *     <li>It launches our application in the main() method.</li>
 * </ol>
 * @author Petri Kainulainen
 */
@Configuration
@EnableAutoConfiguration
@ComponentScan
public class TodoAppConfig {

    protected String getDatabaseName() {
        return "dont-forget";
    }

    @Bean
    public Mongo mongo() throws Exception {
        //return new MongoClient(new MongoClientURI("mongodb://admin:admin@ds143071.mlab.com:43071/dont-forget"));

        List<MongoCredential> credentials = new ArrayList<>();
        credentials.add(MongoCredential.createScramSha1Credential("admin", getDatabaseName(), "admin".toCharArray()));

        return new MongoClient(new ServerAddress("ds143071.mlab.com", 43071), credentials);
    }

    @Bean
    public MongoTemplate mongoTemplate() throws Exception {
        return new MongoTemplate(mongo(), getDatabaseName());
    }

    @Bean
    public TaskRepositoryImp taskRepositoryImp(MongoTemplate mongoTemplate){
        return new TaskRepositoryImp(mongoTemplate);
    }

    public static void main(String[] args) {
        SpringApplication.run(TodoAppConfig.class, args);
    }
}
