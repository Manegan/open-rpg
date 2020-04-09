package fr.openrpg.openrpg.model.document.auh

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import fr.openrpg.openrpg.security.Role
import org.springframework.data.mongodb.core.mapping.Document
import java.util.stream.Collectors
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

@Document("user")
data class UserDocument(private var username: String?) : UserDetails {
    private var password: String? = null

    private var enabled: Boolean? = null

    private var roles: List<Role>? = null

    private var email: String? = null

    override fun getUsername(): String? {
        return username
    }

    fun setUsername(username: String) {
        this.username = username
    }

    override fun isAccountNonExpired(): Boolean {
        return false
    }

    override fun isAccountNonLocked(): Boolean {
        return false
    }

    override fun isCredentialsNonExpired(): Boolean {
        return false
    }

    override fun isEnabled(): Boolean {
        return this.enabled!!
    }

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return this.roles!!.stream().map { authority -> SimpleGrantedAuthority(authority.name) }.collect(Collectors.toList())
    }

    @JsonIgnore
    override fun getPassword(): String? {
        return password
    }

    @JsonProperty
    fun setPassword(password: String) {
        this.password = password
    }

    fun getRoles(): List<Role>? {
        return roles
    }

    fun setRoles(roles: List<Role>?) {
        this.roles = roles
    }

    fun getEmail(): String? {
        return email
    }

    fun setEmail(email: String?) {
        this.email = email
    }
}
