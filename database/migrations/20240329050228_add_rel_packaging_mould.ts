import { Migration } from '@mikro-orm/migrations'

export class Migration20240329050228AddRelPackagingMould extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "item" add column "packaging_id" text null;')
    this.addSql(
      `alter table "item" add constraint "item_packaging_id_foreign"
      foreign key ("packaging_id")
      references "item" ("id")
      on update cascade
      on delete set null;`
    )
  }

  async down(): Promise<void> {
    this.addSql('alter table "item" drop constraint "item_packaging_id_foreign";')

    this.addSql('alter table "item" drop column "packaging_id";')
  }
}
