package fr.openrpg.openrpg.model.document.rpg

import fr.openrpg.openrpg.model.domain.rpg.Character
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import kotlin.reflect.full.memberProperties

@Document("characters")
data class CharacterDocument(
    @Id
    val id: String,
    val author: String,
    val name: String,
    val aspects: List<String>,
    val phases: List<String>
)

fun CharacterDocument.toCharacter() = with(::Character) {
    val propertiesByName = CharacterDocument::class.memberProperties.associateBy { it.name }
    callBy(parameters.associate { parameter ->
        parameter to propertiesByName[parameter.name]?.get(this@toCharacter)
    })
}
