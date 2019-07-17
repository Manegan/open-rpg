package fr.openrpg.openrpg.security

import org.springframework.beans.factory.annotation.Value
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import java.security.spec.InvalidKeySpecException
import java.security.NoSuchAlgorithmException
import java.util.*
import javax.crypto.spec.PBEKeySpec
import javax.crypto.SecretKeyFactory

@Component
class PBKDF2Encoder(
        @Value("\${springbootwebfluxjjwt.password.encoder.secret}") private var secret: String,
        @Value("\${springbootwebfluxjjwt.password.encoder.iteration}") private val iteration: Int? = null,
        @Value("\${springbootwebfluxjjwt.password.encoder.keylength}") private val keylength: Int? = null
): PasswordEncoder {

    override fun encode(cs: CharSequence?): String {
        try {
            val result = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512")
                    .generateSecret(PBEKeySpec(cs.toString().toCharArray(), secret.toByteArray(), iteration!!, keylength!!))
                    .encoded
            return Base64.getEncoder().encodeToString(result)
        } catch (ex: NoSuchAlgorithmException) {
            throw RuntimeException(ex)
        } catch (ex: InvalidKeySpecException) {
            throw RuntimeException(ex)
        }

    }

    override fun matches(cs: CharSequence?, string: String?): Boolean {
        return encode(cs) == string
    }
}
