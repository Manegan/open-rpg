package fr.openrpg.openrpg.repository

import fr.openrpg.openrpg.model.document.auh.UserDocument
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

@Repository
interface UserRepository: ReactiveMongoRepository<UserDocument, String> {
    fun findByUsername(username: String): Mono<UserDocument>

    fun findByEmail(email: String): Mono<UserDocument>
}
