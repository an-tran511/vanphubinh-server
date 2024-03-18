import { Migration } from '@mikro-orm/migrations'

export class Migration20240318050211CreatePartnerTable extends Migration {
  async up(): Promise<void> {
    this.addSql('create sequence if not exists "partner_seq" start 1;')
    this.addSql(
      `create table "partner" (
        "id" text not null default lpad(nextval(\'partner_seq\')::text,4,\'0\'),
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
    this.addSql('drop sequence if exists "partner_seq";')
  }
}
