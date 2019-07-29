package fr.openrpg.openrpg.model

import org.springframework.data.mongodb.core.mapping.Document

@Document("characters")
data class Character(
        val name: String
)