package fr.openrpg.openrpg.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Not found")
class DocumentNotFoundException(attr: String): ApiError(attr)