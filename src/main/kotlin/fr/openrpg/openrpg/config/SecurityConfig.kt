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
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.reactive.CorsConfigurationSource
import org.springframework.web.cors.reactive.CorsWebFilter
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource
import org.springframework.web.reactive.config.CorsRegistry
import org.springframework.web.reactive.config.WebFluxConfigurer
import reactor.core.publisher.Mono

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
class SecurityConfig(
        private val authenticationManager: AuthenticationManager,
        private val securityContextRepository: SecurityContextRepository
): WebFluxConfigurer {
    @Bean
    fun securityWebFilterChain(http: ServerHttpSecurity): SecurityWebFilterChain {
        return http
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint { swe, _ ->
                        Mono.fromRunnable { swe.response.statusCode = HttpStatus.UNAUTHORIZED }
                } .accessDeniedHandler { swe, _ ->
                        Mono.fromRunnable { swe.response.statusCode = HttpStatus.FORBIDDEN }
                }
            .and()
                .authenticationManager(authenticationManager)
                .securityContextRepository(securityContextRepository)
                .authorizeExchange()
                .pathMatchers(HttpMethod.OPTIONS).permitAll()
                .pathMatchers(HttpMethod.GET, "/").permitAll()
                .pathMatchers(HttpMethod.GET, "/static/**").permitAll()
                .pathMatchers(HttpMethod.GET, "/*.(json,js,ico)").permitAll()
                .pathMatchers(HttpMethod.POST, "/api/user").permitAll()
                .pathMatchers(HttpMethod.POST, "/login").permitAll()
                .anyExchange().authenticated()
            .and()
                .build()
    }

    private fun corsConfiguration(): CorsConfiguration {
        val corsConfiguration = CorsConfiguration()
        corsConfiguration.allowCredentials = true
        corsConfiguration.allowedHeaders = listOf("*")
        corsConfiguration.allowedOrigins = listOf("*")
        corsConfiguration.allowedMethods = listOf("*")
        corsConfiguration.maxAge = 3600
        return corsConfiguration
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", corsConfiguration())
        return source
    }
}
