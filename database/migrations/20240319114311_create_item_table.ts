import { Migration } from '@mikro-orm/migrations'

export class Migration20240319114311CreateItemTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "item" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" text not null, "uom_id" text not null, "customer_id" text null, "item_category_id" text null, "default_supplier_id" text null, "item_code" text not null, "is_stockable" boolean not null, "note" text not null, "attributes" jsonb null, "type" text check ("type" in (\'packaging\', \'mould\')) null, constraint "item_pkey" primary key ("id"));'
    )
    this.addSql('alter table "item" add constraint "item_item_code_unique" unique ("item_code");')
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

    this.addSql('alter table "partner" alter column "id" type text using ("id"::text);')
    this.addSql(
      'alter table "partner" alter column "id" set default lpad(nextval(\'partner_seq\')::text,3,\'0\');'
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "item" cascade;')

    this.addSql('alter table "partner" alter column "id" type text using ("id"::text);')
    this.addSql(
      'alter table "partner" alter column "id" set default lpad(nextval(\'partner_seq\')::text,4,\'0\');'
    )
  }
}
