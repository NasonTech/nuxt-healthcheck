import { z } from 'zod'

import { _authHandlers } from '../utils/defineHealthcheckAuth'
import { useHealthchecks } from '../utils/useHealthchecks'

import { defineEventHandler, getQuery, setResponseStatus, useNitroApp, useRuntimeConfig } from '#imports'

const querySchema = z.object({
	exclude: z.preprocess((value) => (value === undefined ? [] : Array.isArray(value) ? value : [value]), z.array(z.string())),
	include: z.preprocess((value) => (value === undefined ? [] : Array.isArray(value) ? value : [value]), z.array(z.string())),
	verbose: z.preprocess((value) => value === '', z.boolean()),
})

const healthChecks = useHealthchecks()

export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig()

	if (!runtimeConfig.healthcheck.readyz) return

	const nitroApp = useNitroApp()

	const query = getQuery(event)

	const options = querySchema.parse(query)

	await nitroApp.hooks.callHook('healthcheck:readyz', event)

	if (options.verbose) {
		for (const authHandler of _authHandlers) {
			const result = await authHandler(event)
			if (!result) {
				setResponseStatus(event, 401)
				return
			}
		}

		const currentChecks = healthChecks.filter((healthCheck) => {
			if (options.include.length > 0) {
				return options.include.includes(healthCheck.name) && !options.exclude.includes(healthCheck.name)
			}

			return !options.exclude.includes(healthCheck.name)
		})

		let allAreHealthy = true
		const checkResultsSettled = await Promise.allSettled(
			currentChecks.map(async (healthCheck) => {
				const { isHealthy, data } = await healthCheck.handler(event)

				allAreHealthy &&= isHealthy

				return { name: healthCheck.name, isHealthy, data }
			}),
		)

		const checkResults = checkResultsSettled.reduce(
			(acc, checkResultSettle) => {
				if (checkResultSettle.status === 'fulfilled') {
					const { name, isHealthy, data } = checkResultSettle.value

					acc[name] = { isHealthy, data }
				}

				return acc
			},
			{} as { [key: string]: object },
		)

		if (!allAreHealthy) setResponseStatus(event, 500)

		return checkResults
	}
})
