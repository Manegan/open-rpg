package fr.openrpg.openrpg.service

import fr.openrpg.openrpg.exception.AlreadyExistException
import fr.openrpg.openrpg.exception.BadRequestException
import fr.openrpg.openrpg.model.auth.User
import fr.openrpg.openrpg.repository.UserRepository
import fr.openrpg.openrpg.security.PBKDF2Encoder
import fr.openrpg.openrpg.security.Role
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class UserService(val userRepository: UserRepository, val pbkdF2Encoder: PBKDF2Encoder) {
    fun save(user: User): Mono<*> {
        user.setRoles(user.getRoles()!!.toMutableList() + Role.ROLE_USER)
        user.setPassword(pbkdF2Encoder.encode(user.password))
        return userRepository.findByUsername(user.username!!)
                .onErrorResume { Mono.error(BadRequestException()) }
                .map<User> { throw AlreadyExistException("user") }
                .switchIfEmpty(userRepository.findByEmail(user.getEmail()!!)
                        .onErrorResume { Mono.error(BadRequestException()) }
                        .map<User> { throw AlreadyExistException("email") }
                        .switchIfEmpty(userRepository.save(user)))
    }
}
