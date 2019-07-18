package fr.openrpg.openrpg.config

import fr.openrpg.openrpg.security.AuthenticationManager
import fr.openrpg.openrpg.security.SecurityContextRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.web.server.SecurityWebFilterChain
import reactor.core.publisher.Mono

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
class SecurityConfig(private val authenticationManager: AuthenticationManager, private val securityContextRepository: SecurityContextRepository) {
    @Bean
    fun securitygWebFilterChain(http: ServerHttpSecurity): SecurityWebFilterChain {
        return http
                .exceptionHandling()
                .authenticationEntryPoint { swe, _ ->
                        Mono.fromRunnable { swe.response.statusCode = HttpStatus.UNAUTHORIZED }
                } .accessDeniedHandler { swe, _ ->
                        Mono.fromRunnable { swe.response.statusCode = HttpStatus.FORBIDDEN }
                }
            .and()
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .authenticationManager(authenticationManager)
                .securityContextRepository(securityContextRepository)
                .authorizeExchange()
                .pathMatchers(HttpMethod.OPTIONS).permitAll()
                .pathMatchers(HttpMethod.GET, "/").permitAll()
                .pathMatchers(HttpMethod.GET, "/static/**").permitAll()
                .pathMatchers(HttpMethod.GET, "/*.(json,js,ico)").permitAll()
                .pathMatchers(HttpMethod.POST, "/api/user").permitAll()
                .pathMatchers("/login").permitAll()
                .anyExchange().authenticated()
            .and()
                .build()
    }
}
