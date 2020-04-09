package fr.openrpg.openrpg.web.rest

import fr.openrpg.openrpg.exception.AlreadyExistException
import fr.openrpg.openrpg.model.document.auh.UserDocument
import fr.openrpg.openrpg.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/api/user")
class UserController(val userService: UserService) {
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createUser(@RequestBody user: UserDocument): Mono<*> =
            userService.save(user)

    @ExceptionHandler(AlreadyExistException::class)
    fun handleException(ex: AlreadyExistException): ResponseEntity<*> = ResponseEntity(ex, HttpStatus.BAD_REQUEST)
}