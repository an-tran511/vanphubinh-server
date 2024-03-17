import { TSMigrationGenerator } from '@mikro-orm/migrations'
import string from '@poppinss/utils/string'

export class CustomMigrationGenerator extends TSMigrationGenerator {
  generateMigrationFile(className: string, diff: { up: string[]; down: string[] }): string {
    return super.generateMigrationFile(string.pascalCase(className), diff)
  }
}
