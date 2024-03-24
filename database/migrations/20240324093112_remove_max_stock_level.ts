import { Migration } from '@mikro-orm/migrations'

export class Migration20240324093112RemoveMaxStockLevel extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "location" drop column "max_stock_level";')
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "location" add column "max_stock_level" numeric(10,2) not null default 0;'
    )
  }
}
