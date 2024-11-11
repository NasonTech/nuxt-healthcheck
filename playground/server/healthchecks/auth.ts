export default defineHealthcheck((_event) => {
	const data = {
		usedConnections: 10,
		maxConnections: 10,
		unusedConnections: 0,
	}

	const isHealthy = data.usedConnections < data.maxConnections

	return {
		data,
		isHealthy,
	}
})
