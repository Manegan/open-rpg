package fr.openrpg.web.rest

import fr.openrpg.exception.DocumentNotFoundException
import fr.openrpg.model.domain.rpg.Character
import fr.openrpg.service.CharacterService
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.security.Principal

@RestController
@RequestMapping("/api/characters")
class CharacterController(val service: CharacterService) {
    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    @ResponseStatus(HttpStatus.CREATED)
    fun createCharacter(@RequestBody @Validated character: Character, principal: Principal): Mono<Character> =
        service.save(character, principal.name)

    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    fun findCharacters(
            @RequestParam("page") page: Int,
            @RequestParam("size") size: Int,
            principal: Principal
    ): Flux<Character> = service.findAll(principal.name, PageRequest.of(page, size))

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    fun findCharacterById(@PathVariable id: String, principal: Principal): Mono<*> = service.findById(id, principal.name)

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    fun deleteCharacterById(@PathVariable id: String, principal: Principal): Mono<*> = service.deleteById(id, principal.name)


    @ExceptionHandler(DocumentNotFoundException::class)
    fun handleException(ex: DocumentNotFoundException): ResponseEntity<*> = ResponseEntity(ex, HttpStatus.NOT_FOUND)
}