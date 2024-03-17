import { BaseCommand, args } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { db } from '#services/database_service'

export default class MigrationCreate extends BaseCommand {
  static commandName = 'migration:create'
  static description = 'Create a new migration file.'

  @args.string()
  declare name: string

  static options: CommandOptions = {
    startApp: true,
    staysAlive: false,
  }

  async run() {
    await db.getMigrator().createMigration('./database/migrations', false, false, this.name)
  }
}
