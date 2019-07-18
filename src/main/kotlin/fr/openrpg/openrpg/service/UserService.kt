package fr.openrpg.openrpg.service

import fr.openrpg.openrpg.model.User
import fr.openrpg.openrpg.repository.UserRepository
import fr.openrpg.openrpg.security.PBKDF2Encoder
import fr.openrpg.openrpg.security.Role
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class UserService(val userRepository: UserRepository, val pbkdF2Encoder: PBKDF2Encoder) {
    fun save(user: User): Mono<User> {
        user.setRoles(user.getRoles()!!.toMutableList() + Role.ROLE_USER)
        user.setPassword(pbkdF2Encoder.encode(user.password))
        return userRepository.save(user)
    }
}
