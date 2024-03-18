import { Migration } from '@mikro-orm/migrations'

export class Migration20240318045716CreateItemCategoryTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "item_category" (
        "id" text not null,
        "name" text not null,
        "parent_item_category_id" text null,
        "path" text not null,
        "created_at" timestamptz not null,
        "updated_at" timestamptz not null,
        constraint "item_category_pkey" primary key ("id")
      );`
    )

    this.addSql(
      `alter table "item_category" add constraint "item_category_parent_item_category_id_foreign"
      foreign key("parent_item_category_id")
      references "item_category"("id")
      on update cascade
      on delete set null; `
    )
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "item_category" drop constraint "item_category_parent_item_category_id_foreign";'
    )

    this.addSql('drop table if exists "item_category" cascade;')
  }
}
