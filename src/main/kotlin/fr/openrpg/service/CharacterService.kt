package fr.openrpg.service

import fr.openrpg.exception.DocumentNotFoundException
import fr.openrpg.exception.UnauthorizedException
import fr.openrpg.model.document.rpg.toCharacter
import fr.openrpg.model.domain.rpg.Character
import fr.openrpg.model.domain.rpg.toCharacterDocument
import fr.openrpg.repository.CharacterRepository
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class CharacterService(val repository: CharacterRepository) {
    @Transactional
    fun save(character: Character, username: String): Mono<Character> =
        repository.save(character.toCharacterDocument(username)).map { it.toCharacter() }

    fun findAll(name: String, pageable: Pageable): Flux<Character> = repository.findAllByAuthor(name, pageable).map { it.toCharacter() }

    fun findById(id: String, name: String?): Mono<*> =
        repository.findById(id)
                .filter { c -> name.equals(c.author) }
                .switchIfEmpty(Mono.error(DocumentNotFoundException("id")))

    @Transactional
    fun deleteById(id: String, name: String?): Mono<Void> {
        return repository.findById(id)
                .filter { name.equals(it.author) }
                .switchIfEmpty(Mono.error(UnauthorizedException()))
                .flatMap { it.id?.let { it1 -> repository.deleteById(it1) } }
    }
}