import { Migration } from '@mikro-orm/migrations'

export class Migration20240317143644CreatePartnerTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "partner" (
        "id" text not null,
        "name" text not null,
        "address" text null,
        "phone" text null,
        "email" text null,
        "notes" text null,
        "created_at" timestamptz not null,
        "updated_at" timestamptz not null,
        constraint "partner_pkey" primary key ("id")
      );`
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "partner" cascade;')
  }
}
