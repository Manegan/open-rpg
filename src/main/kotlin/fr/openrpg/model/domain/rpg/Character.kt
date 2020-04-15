package fr.openrpg.model.domain.rpg

import fr.openrpg.model.document.rpg.CharacterDocument
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size
import kotlin.reflect.full.memberProperties

data class Character(
    val id: String?,
    @get:NotEmpty
    val name: String,
    @get:Size(min=3,max=3)
    val aspects: List<String>,
    @get:Size(min=3,max=3)
    val phases: List<String>,
    @get:NotNull
    val skills: List<Skill>
)

fun Character.toCharacterDocument(username: String) = with(::CharacterDocument) {
    val propertiesByName = Character::class.memberProperties.associateBy { it.name }
    callBy(parameters.associate { parameter ->
        parameter to when(parameter.name) {
            CharacterDocument::author.name -> username
            else -> propertiesByName[parameter.name]?.get(this@toCharacterDocument)
        }
    })
}
