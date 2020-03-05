package fr.openrpg.openrpg.model.rpg.ruleset

import org.springframework.data.mongodb.core.mapping.Document

@Document("MetaModel")
data class MetaModel(
        var author: String?,
        var name: String,
        var description: String,
        val rules: List<Rule>,
        val abilities: List<Ability>,
        val items: List<Item>
)
