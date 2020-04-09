package fr.openrpg.openrpg.repository

import fr.openrpg.openrpg.model.document.rpg.CharacterDocument
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Flux
import java.util.*

interface CharacterRepository: ReactiveMongoRepository<CharacterDocument, UUID> {
    fun findAllByAuthor(author: String): Flux<CharacterDocument>
}