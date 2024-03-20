import { Migration } from '@mikro-orm/migrations'

export class Migration20240320070620CreatePartnerTable extends Migration {
  async up(): Promise<void> {
    this.addSql('create sequence if not exists partner_seq start 1;')
    this.addSql(
      `create table "partner" (
        "id" text not null default lpad(nextval(\'partner_seq\')::text,3,\'0\'),
        "created_at" timestamptz not null,
        "updated_at" timestamptz not null,
        "name" text not null,
        "address" text not null default \'\',
        "phone" text not null default \'\',
        "email" text not null default \'\',
        "notes" text not null default \'\',
        constraint "partner_pkey" primary key ("id"));`
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "partner" cascade;')
    this.addSql('drop sequence if exists partner_seq;')
  }
}
