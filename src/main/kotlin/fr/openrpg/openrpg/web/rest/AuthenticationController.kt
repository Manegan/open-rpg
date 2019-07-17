package fr.openrpg.openrpg.web.rest

import fr.openrpg.openrpg.model.AuthRequest
import fr.openrpg.openrpg.model.AuthResponse
import fr.openrpg.openrpg.repository.UserRepository
import fr.openrpg.openrpg.security.JWTUtil
import fr.openrpg.openrpg.security.PBKDF2Encoder
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
class AuthenticationController(val jwtUtil: JWTUtil, val pbkdF2Encoder: PBKDF2Encoder, val userRepository: UserRepository) {

    @PostMapping("/login")
    fun login(@RequestBody req: AuthRequest): Mono<*> =
        userRepository.findByUsername(req.username!!)
            .map {
                if (pbkdF2Encoder.encode(req.password) == it.password) {
                    return@map ResponseEntity.ok(AuthResponse(jwtUtil.generateToken(it)))
                }
                return@map ResponseEntity.status(HttpStatus.UNAUTHORIZED).build<AuthResponse>()
            }.defaultIfEmpty(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build<AuthResponse>())
}
