package fr.openrpg.openrpg.web.rest

import fr.openrpg.openrpg.exception.AlreadyExistException
import fr.openrpg.openrpg.model.User
import fr.openrpg.openrpg.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/api")
class UserController(val userService: UserService) {
    @PostMapping("/user")
    @ResponseStatus(HttpStatus.CREATED)
    fun createUser(@RequestBody user: User): Mono<*> = userService.save(user)

    @ExceptionHandler(AlreadyExistException::class)
    fun handleException(ex: AlreadyExistException): ResponseEntity<*> {
        return ResponseEntity(ex, HttpStatus.BAD_REQUEST)
    }
}