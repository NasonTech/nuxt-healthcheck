export default defineHealthcheck((_event) => {
	const data = {
		usedConnections: 0,
		maxConnections: 10,
		unusedConnections: 5,
	}

	const isHealthy = data.usedConnections < data.maxConnections

	return {
		data,
		isHealthy,
	}
})
