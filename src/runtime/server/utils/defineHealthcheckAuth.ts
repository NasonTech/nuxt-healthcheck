import type { AuthHandler } from '../../types'

export const _authHandlers: AuthHandler[] = []

export const defineHealthcheckAuth = async (authHandler: AuthHandler) => {
	_authHandlers.push(authHandler)
}
