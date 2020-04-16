package fr.openrpg.repository

import fr.openrpg.model.document.auth.UserDocument
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

@Repository
interface UserRepository: ReactiveMongoRepository<UserDocument, String> {
    fun findByUsername(username: String): Mono<UserDocument>

    fun findByEmail(email: String): Mono<UserDocument>
}
