import DatabaseSeeder from '#database/seeders/database_seeder'
import { BaseCommand, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { db } from '#services/database_service'

export default class MigrationRefresh extends BaseCommand {
  static commandName = 'migration:refresh'
  static description = 'Rollback database, rerun all migrations with optional seed'

  @flags.boolean()
  declare seed: boolean

  static options: CommandOptions = {
    startApp: true,
    staysAlive: false,
  }

  async run() {
    await db.getMigrator().down({ to: 0 })
    await db.getMigrator().up()
    if (this.seed) {
      await db.getSeeder().seed(DatabaseSeeder)
    }
  }
}
