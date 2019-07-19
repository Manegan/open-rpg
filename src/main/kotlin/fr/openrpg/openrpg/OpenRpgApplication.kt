package fr.openrpg.openrpg

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class OpenRpgApplication

fun main(args: Array<String>) {
	runApplication<OpenRpgApplication>(*args)
}
