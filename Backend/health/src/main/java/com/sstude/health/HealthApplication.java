package com.sstude.health;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class HealthApplication {

    public static void main(String[] args) {
        SpringApplication.run(HealthApplication.class, args);
    }

}
