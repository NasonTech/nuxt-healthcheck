import { defineEventHandler, setResponseStatus, useNitroApp, useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig()

	if (!runtimeConfig.healthcheck.livez) return

	const nitroApp = useNitroApp()
	await nitroApp.hooks.callHook('healthcheck:livez', event)

	setResponseStatus(event, 200)

	return
})
