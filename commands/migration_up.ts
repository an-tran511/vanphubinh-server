import type { CommandOptions } from '@adonisjs/core/types/ace'
import { BaseCommand } from '@adonisjs/core/ace'
import { db } from '#services/database_service'

export default class MigrationUp extends BaseCommand {
  static commandName = 'migration:up'
  static description = 'Run all pending migrations'

  static options: CommandOptions = {
    startApp: true,
    staysAlive: false,
  }

  async run() {
    try {
      await db.getMigrator().up()
    } catch (error) {
      this.logger.error(error.message)
      this.error = error
      this.exitCode = 1
    }
  }
}
