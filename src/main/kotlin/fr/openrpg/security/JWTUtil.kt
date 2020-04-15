package fr.openrpg.security

import fr.openrpg.model.document.auth.UserDocument
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.io.Serializable
import java.util.*


@Component
class JWTUtil : Serializable {

    @Value("\${springbootwebfluxjjwt.jjwt.secret}")
    private val secret: String? = null

    @Value("\${springbootwebfluxjjwt.jjwt.expiration}")
    private val expirationTime: String? = null

    fun getAllClaimsFromToken(token: String): Claims {
        return Jwts.parser().setSigningKey(Base64.getEncoder().encodeToString(secret!!.toByteArray())).parseClaimsJws(token).body
    }

    fun getUsernameFromToken(token: String): String {
        return getAllClaimsFromToken(token).subject
    }

    fun getExpirationDateFromToken(token: String): Date {
        return getAllClaimsFromToken(token).expiration
    }

    private fun isTokenExpired(token: String): Boolean {
        val expiration = getExpirationDateFromToken(token)
        return expiration.before(Date())
    }

    fun generateToken(user: UserDocument): String {
            val claims = HashMap<String, Any?>()
        claims["role"] = user.getRoles()
        return doGenerateToken(claims, user.username)
    }

    private fun doGenerateToken(claims: Map<String, Any?>, username: String?): String {
        val expirationTimeLong = java.lang.Long.parseLong(expirationTime!!) //in second

        val createdDate = Date()
        val expirationDate = Date(createdDate.time + expirationTimeLong * 1000)
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, Base64.getEncoder().encodeToString(secret!!.toByteArray()))
                .compact()
    }

    fun validateToken(token: String): Boolean {
        return !(isTokenExpired(token))
    }

    companion object {

        private const val serialVersionUID = 1L
    }
}
