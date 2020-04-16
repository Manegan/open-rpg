package fr.openrpg.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus
import java.lang.RuntimeException

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Unauthorized")
class UnauthorizedException: RuntimeException()