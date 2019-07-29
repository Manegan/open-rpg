package fr.openrpg.openrpg.web.rest

import fr.openrpg.openrpg.model.Character
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController("/character")
class CharacterController {
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createCharacter(): Mono<Character> {
        return Mono.empty()
    }
}