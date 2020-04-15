package fr.openrpg.service

import fr.openrpg.exception.AlreadyExistException
import fr.openrpg.exception.BadRequestException
import fr.openrpg.model.document.auth.UserDocument
import fr.openrpg.repository.UserRepository
import fr.openrpg.security.PBKDF2Encoder
import fr.openrpg.security.Role
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Mono

@Service
class UserService(val userRepository: UserRepository, val pbkdF2Encoder: PBKDF2Encoder) {
    @Transactional
    fun save(user: UserDocument): Mono<*> {
        user.setRoles(user.getRoles()!!.toMutableList() + Role.ROLE_USER)
        user.setPassword(pbkdF2Encoder.encode(user.password))
        return userRepository.findByUsername(user.username!!)
                .onErrorResume { Mono.error(BadRequestException()) }
                .map<UserDocument> { throw AlreadyExistException("user") }
                .switchIfEmpty(userRepository.findByEmail(user.getEmail()!!)
                        .onErrorResume { Mono.error(BadRequestException()) }
                        .map<UserDocument> { throw AlreadyExistException("email") }
                        .switchIfEmpty(userRepository.save(user)))
    }
}
