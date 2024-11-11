import type { Resolver } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'

import { defineNuxtModule, createResolver, addServerImportsDir, addServerHandler, addServerPlugin } from '@nuxt/kit'
import fg from 'fast-glob'
import defu from 'defu'

import type { ModuleOptions } from './runtime/types'

import { createTemplateNuxtPlugin } from './templates'

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'nuxt-healthcheck',
		configKey: 'healthcheck',
	},
	// Default configuration options of the Nuxt module
	defaults: {
		readyz: true,
		livez: true,
	},
	async setup(_options, _nuxt) {
		const resolver = createResolver(import.meta.url)

		_nuxt.options.runtimeConfig.healthcheck = defu(_nuxt.options.runtimeConfig.healthcheck, _options)

		addServerHandler({
			route: `/livez`,
			handler: resolver.resolve('./runtime/server/routes/livez.get.ts'),
			method: 'get',
		})

		addServerHandler({
			route: `/readyz`,
			handler: resolver.resolve('./runtime/server/routes/readyz.get.ts'),
			method: 'get',
		})

		addServerImportsDir(resolver.resolve('runtime/server/utils'))

		const healthchecks = await scanFolder(_nuxt, resolver, 'server/healthchecks')
		createTemplateNuxtPlugin(healthchecks)

		addServerPlugin(resolver.resolve(_nuxt.options.buildDir, '0.healthchecks-nuxt-plugin'))

		_nuxt.options.build.transpile.push(resolver.resolve('runtime'))
	},
})

export const scanFolder = async (nuxt: Nuxt, resolver: Resolver, path: string): Promise<string[]> => {
	const resolvedPath = resolver.resolve(nuxt.options.srcDir, path)

	const files: string[] = []

	const updatedFiles = await fg('**/*.{ts,js,mjs}', {
		cwd: resolvedPath,
		absolute: true,
		onlyFiles: true,
	})

	files.push(...new Set(updatedFiles))

	return files
}
