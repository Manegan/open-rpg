package fr.openrpg.security

import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.util.*
import java.util.stream.Collectors

@Component
class AuthenticationManager(val jwtUtil: JWTUtil) : ReactiveAuthenticationManager {

    override fun authenticate(authentication: Authentication): Mono<Authentication> {
        val authToken = authentication.credentials.toString()

        val username = try {
            jwtUtil.getUsernameFromToken(authToken)
        } catch (e: Exception) {
            null
        }

        return if (username != null && jwtUtil.validateToken(authToken)) {
            val claims = jwtUtil.getAllClaimsFromToken(authToken)
            val rolesMap: List<String> = claims.get("role", List::class.java).map { it.toString() }
            val roles = ArrayList<Role>()
            for (roleMap in rolesMap) {
                roles.add(Role.valueOf(roleMap))
            }
            val auth = UsernamePasswordAuthenticationToken(
                    username, null,
                    roles.stream().map { authority -> SimpleGrantedAuthority(authority.name) }.collect(Collectors.toList())
            )
            Mono.just(auth)
        } else {
            Mono.empty()
        }
    }
}
