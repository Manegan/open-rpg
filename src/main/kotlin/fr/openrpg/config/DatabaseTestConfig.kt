package fr.openrpg.config

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import fr.openrpg.model.document.auth.UserDocument
import fr.openrpg.model.document.rpg.CharacterDocument
import fr.openrpg.security.PBKDF2Encoder
import fr.openrpg.security.Role
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.core.io.Resource
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import javax.annotation.PostConstruct

@Configuration
@Profile("!production")
class DatabaseTestConfig (
        val mongoTemplate: MongoTemplate,
        val objectMapper: ObjectMapper,
        val pbkdF2Encoder: PBKDF2Encoder,
        @Value("classpath:users_test_data.json") val dataUsers: Resource,
        @Value("classpath:chars_test_data.json") val dataChars: Resource
) {
    val log: Logger = LoggerFactory.getLogger(DatabaseTestConfig::class.java)

    @PostConstruct
    fun initDatabse() {
        val users: List<UserDocument> = objectMapper.readValue(dataUsers.file.readLines().joinToString(""))
        mongoTemplate.remove(Query.query(Criteria.where("username").exists(true)), UserDocument::class.java)
        users.forEach { it.setPassword(pbkdF2Encoder.encode(it.password)) }
        users.forEach { mongoTemplate.save(it) }

        users.forEach { mongoTemplate.findAllAndRemove(Query.query(Criteria.where("author").`is`(it.username)), CharacterDocument::class.java) }
        val chars: List<CharacterDocument> = objectMapper.readValue(dataChars.file.readLines().joinToString(""))
        chars.forEach { mongoTemplate.save(it) }
    }
}