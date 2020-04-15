package fr.openrpg.web.rest

import fr.openrpg.exception.UnauthorizedException
import fr.openrpg.model.domain.auth.AuthRequest
import fr.openrpg.model.domain.auth.AuthResponse
import fr.openrpg.repository.UserRepository
import fr.openrpg.security.JWTUtil
import fr.openrpg.security.PBKDF2Encoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono
import reactor.core.publisher.switchIfEmpty

@RestController
class AuthenticationController(val jwtUtil: JWTUtil, val pbkdF2Encoder: PBKDF2Encoder, val userRepository: UserRepository) {

    @PostMapping("/login")
    fun login(@RequestBody req: AuthRequest): Mono<AuthResponse> =
        userRepository.findByUsername(req.username)
            .map {
                if (pbkdF2Encoder.encode(req.password) == it.password) {
                    return@map AuthResponse(jwtUtil.generateToken(it))
                }
                throw UnauthorizedException()
            }.switchIfEmpty { Mono.error(UnauthorizedException()) }
}
