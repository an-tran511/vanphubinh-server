import { Migration } from '@mikro-orm/migrations'

export class Migration20240318045618CreateUomTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "uom" (
        "id" text not null,
        "name" text not null,
        "created_at" timestamptz not null,
        "updated_at" timestamptz not null,
        constraint "uom_pkey" primary key ("id")
      );`
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "uom" cascade;')
  }
}
