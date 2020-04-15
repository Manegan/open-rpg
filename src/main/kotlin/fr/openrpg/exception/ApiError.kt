package fr.openrpg.exception

import java.lang.RuntimeException

open class ApiError(var attr: String?): RuntimeException()
