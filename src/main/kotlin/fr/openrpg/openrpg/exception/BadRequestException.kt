package fr.openrpg.openrpg.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus
import java.lang.RuntimeException

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Bad request")
class BadRequestException: RuntimeException()