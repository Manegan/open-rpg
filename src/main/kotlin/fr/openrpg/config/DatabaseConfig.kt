package fr.openrpg.config

import com.fasterxml.jackson.databind.ObjectMapper
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.Resource
import org.springframework.data.repository.init.Jackson2RepositoryPopulatorFactoryBean

@Configuration
class DatabaseConfig (
        @Value("classpath:chars_test_data.json") val data: Resource
) {
    val log: Logger = LoggerFactory.getLogger(DatabaseConfig::class.java)

    @Bean
    fun repositoryPopulator(objectMapper: ObjectMapper): Jackson2RepositoryPopulatorFactoryBean {
        log.info("Initializing Mongodb")

        val factory = Jackson2RepositoryPopulatorFactoryBean()
        factory.setMapper(objectMapper)
        factory.setResources(arrayOf(data))
        return factory
    }
}