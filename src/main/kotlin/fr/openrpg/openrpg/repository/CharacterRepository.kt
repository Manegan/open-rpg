package fr.openrpg.openrpg.repository

import fr.openrpg.openrpg.model.document.rpg.CharacterDocument
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Flux

interface CharacterRepository: ReactiveMongoRepository<CharacterDocument, String> {
    fun findAllByAuthor(author: String): Flux<CharacterDocument>
}