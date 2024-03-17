import { defineConfig } from '@adonisjs/auth'
import { InferAuthEvents, Authenticators } from '@adonisjs/auth/types'
import { sessionGuard } from '@adonisjs/auth/session'
import { configProvider } from '@adonisjs/core'

const authConfig = defineConfig({
  default: 'web',
  guards: {
    web: sessionGuard({
      provider: configProvider.create(async () => {
        const { SessionMikroUserProvider } = await import('../providers/auth_provider.js')
        return new SessionMikroUserProvider()
      }),
      useRememberMeTokens: false,
    }),
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
