package fr.openrpg.security

import fr.openrpg.config.properties.PasswordEncodingProperties
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import java.security.NoSuchAlgorithmException
import java.security.spec.InvalidKeySpecException
import java.util.*
import javax.crypto.SecretKeyFactory
import javax.crypto.spec.PBEKeySpec

@Component
class PBKDF2Encoder(
        val properties: PasswordEncodingProperties
): PasswordEncoder {

    override fun encode(cs: CharSequence?): String {
        try {
            val result = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512")
                    .generateSecret(PBEKeySpec(cs.toString().toCharArray(), properties.secret.toByteArray(), properties.iteration, properties.keylength))
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
