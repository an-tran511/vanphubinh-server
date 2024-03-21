import { Migration } from '@mikro-orm/migrations'

export class Migration20240321142318CreatePurchaseMouldOrderTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "purchase_mould_order" ("id" text not null, "updated_at" timestamptz not null, "supplier_id" text not null, "quantity" numeric(10,0) not null default 1, "mould_id" text not null, "created_at" timestamptz not null, "expected_receiving_date" timestamptz not null, "type" text check ("type" in (\'new\', \'repair\', \'replace\')) not null, "notes" text not null default \'\', "status" text check ("status" in (\'draft\', \'confirmed\', \'cancelled\')) not null default \'draft\', constraint "purchase_mould_order_pkey" primary key ("id"), constraint purchase_mould_order_check check (quantity >= 1));'
    )

    this.addSql(
      'alter table "purchase_mould_order" add constraint "purchase_mould_order_supplier_id_foreign" foreign key ("supplier_id") references "partner" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "purchase_mould_order" add constraint "purchase_mould_order_mould_id_foreign" foreign key ("mould_id") references "item" ("id") on update cascade;'
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "purchase_mould_order" cascade;')
  }
}
