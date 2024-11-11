import type { H3Event } from 'h3'
import type { HealthcheckResult } from '../../types'

export const defineHealthcheck = (handler: (event: H3Event) => HealthcheckResult) => handler
