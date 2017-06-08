package com.javaadvent.bootrest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * This configuration class has three responsibilities:
 * <ol>
 *     <li>It enables the auto configuration of the Spring application context.</li>
 *     <li>
 *         It ensures that Spring looks for other components (controllers, services, and repositories) from the
 *         <code>com.javaadvent.bootrest.task</code> package.
 *     </li>
 *     <li>It launches our application in the main() method.</li>
 * </ol>
 */
//@ConfigurationProperties(prefix = "jade.connector", locations = "application.properties")
@Configuration
@EnableAutoConfiguration
@ComponentScan
@Import(TodoAppConfig.class)
public class TodoApp {

    public static void main(String[] args) {
        SpringApplication.run(TodoApp.class, args);
    }


}
