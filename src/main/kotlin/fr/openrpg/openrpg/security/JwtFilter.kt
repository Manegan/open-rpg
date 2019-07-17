package fr.openrpg.openrpg.security

import org.springframework.http.HttpStatus
import org.springframework.util.StringUtils
import org.springframework.web.server.ServerWebExchange
import org.springframework.web.server.WebFilter
import org.springframework.web.server.WebFilterChain
import reactor.core.publisher.Mono

class JwtFilter: WebFilter {
    override fun filter(exch: ServerWebExchange, chain: WebFilterChain): Mono<Void> {
        val jwt: String = exch.request.cookies.getFirst("JWT_SESSION").toString()
        if (StringUtils.isEmpty(jwt)) {
            exch.response.statusCode = HttpStatus.UNAUTHORIZED
            return Mono.empty()
        }
        return chain.filter(exch)
    }
}