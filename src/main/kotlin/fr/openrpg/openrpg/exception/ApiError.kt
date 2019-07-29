package fr.openrpg.openrpg.exception

import java.lang.RuntimeException

abstract class ApiError(var attr: String): RuntimeException()