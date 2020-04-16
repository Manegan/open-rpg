package fr.openrpg

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

@SpringBootApplication
class OpenRpgApplication

fun main(args: Array<String>) {
	runApplication<OpenRpgApplication>(*args)
}

@Bean
fun objectMapper(): ObjectMapper = ObjectMapper().registerKotlinModule()
