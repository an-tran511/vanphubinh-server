import { Migration } from '@mikro-orm/migrations'

export class Migration20240320071016CreateItemTable extends Migration {
  async up(): Promise<void> {
    this.addSql('create sequence if not exists packaging_seq start 1;')
    this.addSql(
      `create table "item" (
        "id" text not null,
        "created_at" timestamptz not null,
        "updated_at" timestamptz not null,
        "name" text not null,
        "uom_id" text not null,
        "customer_id" text null,
        "item_category_id" text null,
        "default_supplier_id" text null,
        "item_code" text not null default \'\',
        "is_stockable" boolean not null default true,
        "notes" text not null default \'\',
        "attributes" jsonb null,
        "type" text check ("type" in (\'item\', \'packaging\', \'mould\')) null,
        constraint "item_pkey" primary key ("id")
      );`
    )
    this.addSql('create index "item_type_index" on "item" ("type");')

    this.addSql(
      'alter table "item" add constraint "item_uom_id_foreign" foreign key ("uom_id") references "uom" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "item" add constraint "item_customer_id_foreign" foreign key ("customer_id") references "partner" ("id") on update cascade on delete set null;'
    )
    this.addSql(
      'alter table "item" add constraint "item_item_category_id_foreign" foreign key ("item_category_id") references "item_category" ("id") on update cascade on delete set null;'
    )
    this.addSql(
      'alter table "item" add constraint "item_default_supplier_id_foreign" foreign key ("default_supplier_id") references "partner" ("id") on update cascade on delete set null;'
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "item" cascade;')
    this.addSql('drop sequence if exists packaging_seq;')
  }
}
