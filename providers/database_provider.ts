import type { ApplicationService } from '@adonisjs/core/types'
import { MikroORM } from '@mikro-orm/postgresql'
import databaseConfig from '#config/database'

declare module '@adonisjs/core/types' {
  export interface ContainerBindings {
    'mikro:db': MikroORM
  }
}
export default class MikroProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    // Register your bindings
    this.app.container.singleton(MikroORM, async () => {
      return await MikroORM.init(databaseConfig)
    })
    this.app.container.alias('mikro:db', MikroORM)
  }

  /**
   * The container bindings have booted
   */
  async boot() {
    await this.app.container.make('mikro:db')
  }

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {
    const db = await this.app.container.make('mikro:db')
    db.close(true)
  }
}
