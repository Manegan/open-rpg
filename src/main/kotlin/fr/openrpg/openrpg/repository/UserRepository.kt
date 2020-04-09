package fr.openrpg.openrpg.repository

import fr.openrpg.openrpg.model.document.auh.UserDocument
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono
import java.util.*

@Repository
interface UserRepository: ReactiveMongoRepository<UserDocument, UUID> {
    fun findByUsername(username: String): Mono<UserDocument>

    fun findByEmail(email: String): Mono<UserDocument>
}
