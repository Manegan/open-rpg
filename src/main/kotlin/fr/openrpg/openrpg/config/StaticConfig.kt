package fr.openrpg.openrpg.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.server.*
import org.springframework.web.reactive.function.server.ServerResponse.ok

@Configuration
class StaticConfig {
    @Bean
    fun indexRoute(): RouterFunction<ServerResponse> =
            RouterFunctions.route(
                    RequestPredicates.GET("/"),
                    HandlerFunction { ok().body(BodyInserters.fromResource(ClassPathResource("/site/index.html"))) }
            )

    @Bean
    fun staticRoute(): RouterFunction<ServerResponse> =
            RouterFunctions.resources("/static/**", ClassPathResource("/site/static/"))

    @Bean
    fun rootStaticRoute(): RouterFunction<ServerResponse> =
            RouterFunctions.resources("/*.(json|js|ico)", ClassPathResource("/site/"))
}