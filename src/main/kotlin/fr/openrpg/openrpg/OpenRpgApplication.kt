package fr.openrpg.openrpg

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.reactive.config.EnableWebFlux

@SpringBootApplication
@EnableWebFlux
class OpenRpgApplication

fun main(args: Array<String>) {
	runApplication<OpenRpgApplication>(*args)
}
