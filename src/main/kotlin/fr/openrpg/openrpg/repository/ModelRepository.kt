package fr.openrpg.openrpg.repository

import fr.openrpg.openrpg.model.rpg.ruleset.MetaModel
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import java.util.*

interface ModelRepository: ReactiveMongoRepository<MetaModel, UUID> {
}