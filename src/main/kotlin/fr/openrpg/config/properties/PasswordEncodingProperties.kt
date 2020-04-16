package fr.openrpg.config.properties

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "springbootwebfluxjjwt.password.encoder")
data class PasswordEncodingProperties(
        var secret: String = "",
        var iteration: Int = 0,
        var keylength: Int = 0
)