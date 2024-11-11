# Nuxt Healthcheck

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]
Healthcheck
Nuxt logger for doing amazing things.

-   [✨ &nbsp;Release Notes](/CHANGELOG.md)
-   [🏀 Online playground](https://stackblitz.com/github/nasontech/nuxt-healthcheck?file=playground%2Fapp.vue)

## Features

Simply application healthcheck endpoints.

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @nasontech/nuxt-healthcheck
```

That's it! You can now use `defineHealthcheck` in your Nuxt app ✨

Files placed in `server/healthchecks` will be registered automatically using the filename as the healthcheck name.

Example `server/healthchecks/database.ts`

```typescript
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
```

Querying `/readyz?verbose` will return

```json
{
	"database": {
		"isHealthy": true,
		"data": {
			"usedConnections": 0,
			"maxConnections": 10,
			"unusedConnections": 5
		}
	}
}
```

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nasontech/nuxt-healthcheck/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@nasontech/nuxt-healthcheck
[npm-downloads-src]: https://img.shields.io/npm/dm/@nasontech/nuxt-healthcheck.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/@nasontech/nuxt-healthcheck
[license-src]: https://img.shields.io/npm/l/@nasontech/nuxt-healthcheck.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@nasontech/nuxt-healthcheck
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
