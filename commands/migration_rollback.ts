import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { db } from '#services/database_service'

export default class MigrationRollback extends BaseCommand {
  static commandName = 'migration:rollback'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
    staysAlive: false,
  }

  async run() {
    await db.getMigrator().down({ to: 0 })
  }
}
