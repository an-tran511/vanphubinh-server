import { Migration } from '@mikro-orm/migrations'

export class Migration20240321154310AlterPurchaseMouldOrderTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "purchase_mould_order" add column "created_date" timestamptz not null;'
    )
  }

  async down(): Promise<void> {
    this.addSql('alter table "purchase_mould_order" drop column "created_date";')
  }
}
