import { Migration } from '@mikro-orm/migrations'

export class Migration20240324094909CreateStockQuantModel extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "stock_quant" (
        "item_id" text not null,
        "location_id" text not null,
        "quantity" numeric(15,2) not null default 0,
        "reserved_quantity" numeric(15,2) not null default 0,
        "available_quantity" numeric(15,2) not null default 0,
        constraint "stock_quant_pkey" primary key ("item_id", "location_id"));`
    )

    this.addSql(
      'alter table "stock_quant" add constraint "stock_quant_item_id_foreign" foreign key ("item_id") references "item" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "stock_quant" add constraint "stock_quant_location_id_foreign" foreign key ("location_id") references "location" ("id") on update cascade;'
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "stock_quant" cascade;')
  }
}
