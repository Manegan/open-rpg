package fr.openrpg.repository

import fr.openrpg.model.document.rpg.CharacterDocument
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Flux

interface CharacterRepository: ReactiveMongoRepository<CharacterDocument, String> {
    fun findAllByAuthor(author: String, pageable: Pageable): Flux<CharacterDocument>
}
