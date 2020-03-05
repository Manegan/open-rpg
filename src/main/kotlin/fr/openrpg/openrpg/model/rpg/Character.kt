package fr.openrpg.openrpg.model.rpg

import org.springframework.data.mongodb.core.mapping.Document

@Document("characters")
data class Character(
        val name: String
)