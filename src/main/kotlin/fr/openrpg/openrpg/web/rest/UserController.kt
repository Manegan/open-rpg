package fr.openrpg.openrpg.web.rest

import fr.openrpg.openrpg.model.User
import fr.openrpg.openrpg.service.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/api")
class UserController(val userService: UserService) {
    @PostMapping("/user")
    fun createUser(@RequestBody user: User): Mono<User> = userService.save(user)
}