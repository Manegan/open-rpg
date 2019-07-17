package fr.openrpg.openrpg.config

import fr.openrpg.openrpg.security.JwtFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.SecurityWebFiltersOrder
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.web.server.SecurityWebFilterChain

@Configuration
@EnableWebFluxSecurity
class SecurityConfig {

    fun configure(web: WebSecurity) {
        web.ignoring()
                .antMatchers(HttpMethod.OPTIONS, "/**")
                .antMatchers(HttpMethod.GET, "/")
                .antMatchers(HttpMethod.GET, "/static/**")
                .antMatchers(HttpMethod.GET, "/login")
    }

    @Bean
    fun springSecurityFilterChain(http: ServerHttpSecurity): SecurityWebFilterChain {
        http.addFilterAt(JwtFilter(), SecurityWebFiltersOrder.AUTHORIZATION)
        return http.build()
    }
}

