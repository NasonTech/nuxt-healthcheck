import type { H3Event } from 'h3'

// Module options TypeScript interface definition
export interface ModuleOptions {
	readyz: boolean
	livez: boolean
}

export type AuthHandler = (event: H3Event) => boolean | Promise<boolean>

export type HealthcheckResult = {
	data: object
	isHealthy: boolean
}

export type HealthcheckHandler = (event: H3Event) => HealthcheckResult

declare module 'nitropack/types' {
	interface NitroRuntimeHooks {
		'healthcheck:auth': (event: H3Event) => void
		'healthcheck:livez': (event: H3Event) => void
		'healthcheck:readyz': (event: H3Event) => void
	}
}
