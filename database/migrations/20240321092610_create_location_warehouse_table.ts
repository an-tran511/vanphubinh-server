import { Migration } from '@mikro-orm/migrations'

export class Migration20240321092610CreateLocationWarehouseTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "warehouse" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" text not null, constraint "warehouse_pkey" primary key ("id"));'
    )

    this.addSql(
      'create table "location" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" text not null, "parent_location_id" text null, "path" text not null, "max_stock_level" numeric(10,2) not null default 0, "is_scrap_location" boolean not null default false, "is_return_location" boolean not null default false, "warehouse_id" text null, "type" text check ("type" in (\'view\', \'internal\', \'customer\', \'inventory\', \'production\', \'transit\', \'supplier\')) null, constraint "location_pkey" primary key ("id"));'
    )

    this.addSql(
      'alter table "location" add constraint "location_parent_location_id_foreign" foreign key ("parent_location_id") references "location" ("id") on update cascade on delete set null;'
    )
    this.addSql(
      'alter table "location" add constraint "location_warehouse_id_foreign" foreign key ("warehouse_id") references "warehouse" ("id") on update cascade on delete set null;'
    )
  }

  async down(): Promise<void> {
    this.addSql('alter table "location" drop constraint "location_warehouse_id_foreign";')

    this.addSql('alter table "location" drop constraint "location_parent_location_id_foreign";')

    this.addSql('drop table if exists "warehouse" cascade;')

    this.addSql('drop table if exists "location" cascade;')
  }
}
