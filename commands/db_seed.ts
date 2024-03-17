import type { CommandOptions } from '@adonisjs/core/types/ace'
import { db } from '#services/database_service'
import { BaseCommand, flags } from '@adonisjs/core/ace'

export default class DbSeed extends BaseCommand {
  static commandName = 'db:seed'
  static description = 'Seed the database with records'

  @flags.string()
  declare seeder: string

  static options: CommandOptions = {
    startApp: true,
    staysAlive: false,
  }

  async run() {
    try {
      const seederPath = this.seeder ? this.seeder : 'database_seeder'
      const { default: Seeder } = await import(`#database/seeders/${seederPath}`)
      await db.getSeeder().seed(Seeder)
    } catch (error) {
      this.logger.error(error.message)
      this.error = error
      this.exitCode = 1
    }
  }
}
