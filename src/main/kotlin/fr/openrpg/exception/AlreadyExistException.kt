package fr.openrpg.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Already exist")
class AlreadyExistException(attr: String): ApiError(attr)
