package fr.openrpg.openrpg.service

import fr.openrpg.openrpg.exception.DocumentNotFoundException
import fr.openrpg.openrpg.model.document.rpg.toCharacter
import fr.openrpg.openrpg.model.domain.rpg.Character
import fr.openrpg.openrpg.model.domain.rpg.toCharacterDocument
import fr.openrpg.openrpg.repository.CharacterRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

@Service
class CharacterService(val repository: CharacterRepository) {
    fun save(character: Character, username: String): Mono<Character> =
        repository.save(character.toCharacterDocument(username)).map { it.toCharacter() }

    fun findAll(name: String): Flux<Character> = repository.findAllByAuthor(name).map { it.toCharacter() }

    fun findById(id: UUID, name: String?): Mono<*> =
            repository.findById(id)
                    .filter { c -> name.equals(c.author) }
                    .switchIfEmpty(Mono.error(DocumentNotFoundException("id")))
}