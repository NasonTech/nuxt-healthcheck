import { parse } from 'node:path'
import { addTemplate } from '@nuxt/kit'

// ${methodFactory(healthchecks, 'addHealthcheck', 'healthcheck', ['name', 'processor', 'schedule'])}
export const createTemplateNuxtPlugin = (healthchecks: string[]) => {
	const imports = healthchecks
		.map((healthcheck, index) => `import healthcheck${index} from '${healthcheck.replace('.ts', '')}'`)
		.join('\n')

	const adds = healthchecks
		.map((healthcheck, index) => [
			`healthchecks.push({ name: '${parse(healthcheck).name}', handler: healthcheck${index} })`,
			`logger.success('Healthcheck ${parse(healthcheck).name}')`,
		])
		.flat()
		.join('\n\t')

	const nitroPlugin = `
import { consola } from 'consola'
import { defineNitroPlugin } from '#imports'

${imports}

export default defineNitroPlugin(async (_nitroApp) => {
	const logger = consola.create({})
	const healthchecks = useHealthchecks()

	// Add healthchecks
	${adds}
})
`
	addTemplate({
		filename: '0.healthchecks-nuxt-plugin.ts',
		write: true,
		getContents: () => nitroPlugin,
	})
}
