package fr.openrpg.openrpg.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.util.*
import java.util.stream.Collectors


@Component
class AuthenticationManager : ReactiveAuthenticationManager {

    @Autowired
    private val jwtUtil: JWTUtil? = null

    override fun authenticate(authentication: Authentication): Mono<Authentication> {
        val authToken = authentication.credentials.toString()

        var username: String?
        try {
            username = jwtUtil!!.getUsernameFromToken(authToken)
        } catch (e: Exception) {
            username =
                    null
        }

        if (username != null && jwtUtil!!.validateToken(authToken)!!) {
            val claims = jwtUtil.getAllClaimsFromToken(authToken)
            val rolesMap: List<String> = claims.get("role", List::class.java).map { toString() }
            val roles = ArrayList<Role>()
            for (rolemap in rolesMap) {
                roles.add(Role.valueOf(rolemap))
            }
            val auth = UsernamePasswordAuthenticationToken(
                    username, null,
                    roles.stream().map { authority -> SimpleGrantedAuthority(authority.name) }.collect(Collectors.toList())
            )
            return Mono.just(auth)
        } else {
            return Mono.empty()
        }
    }
}
