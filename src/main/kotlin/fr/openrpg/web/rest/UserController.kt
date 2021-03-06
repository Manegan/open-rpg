package fr.openrpg.web.rest

import fr.openrpg.exception.AlreadyExistException
import fr.openrpg.model.document.auth.UserDocument
import fr.openrpg.service.UserService
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