export default defineNitroPlugin((_nitroApp) => {
	// Register an authentication handler
	defineHealthcheckAuth((_event) => true)
	console.log('Registered healthcheck auth')
})
