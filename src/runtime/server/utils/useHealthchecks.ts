import type { HealthcheckHandler } from '../../types'

export const _healthchecks: { name: string, handler: HealthcheckHandler }[] = []

export const useHealthchecks = () => _healthchecks
