package com.sstude.statistics.global.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableJpaAuditing
@EnableJpaRepositories(basePackages = {
        "com.sstude.statistics.repository"
})

@EnableMongoRepositories(basePackages = "com.sstude.statistics.mongo")
@Configuration
public class JpaConfig {
}
