import { Migration } from '@mikro-orm/migrations'

export class Migration20240322080009AddPartnerCategoryTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "partner_category" (
        "id" text not null,
        "created_at" timestamptz not null,
        "updated_at" timestamptz not null,
        "name" text not null,
        "color" text not null,
        constraint "partner_category_pkey" primary key("id")); `
    )

    this.addSql(
      'create table "partner_partner_categories" ("partner_id" text not null, "partner_category_id" text not null, constraint "partner_partner_categories_pkey" primary key ("partner_id", "partner_category_id"));'
    )

    this.addSql(
      'alter table "partner_partner_categories" add constraint "partner_partner_categories_partner_id_foreign" foreign key ("partner_id") references "partner" ("id") on update cascade on delete cascade;'
    )
    this.addSql(
      'alter table "partner_partner_categories" add constraint "partner_partner_categories_partner_category_id_foreign" foreign key ("partner_category_id") references "partner_category" ("id") on update cascade on delete cascade;'
    )

    this.addSql('alter table "purchase_mould_order" drop column "expected_receiving_date";')
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "partner_partner_categories" drop constraint "partner_partner_categories_partner_category_id_foreign";'
    )

    this.addSql('drop table if exists "partner_category" cascade;')

    this.addSql('drop table if exists "partner_partner_categories" cascade;')

    this.addSql(
      'alter table "purchase_mould_order" add column "expected_receiving_date" timestamptz not null;'
    )
  }
}
