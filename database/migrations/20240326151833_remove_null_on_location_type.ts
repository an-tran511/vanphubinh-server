import { Migration } from '@mikro-orm/migrations'

export class Migration20240326151833RemoveNullOnLocationType extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "location" drop constraint if exists "location_type_check";')

    this.addSql('alter table "location" alter column "type" type text using ("type"::text);')
    this.addSql(
      "alter table \"location\" add constraint \"location_type_check\" check (\"type\" in ('view', 'internal', 'customer', 'inventory', 'production', 'transit', 'supplier'));"
    )
    this.addSql('alter table "location" alter column "type" set not null;')
  }

  async down(): Promise<void> {
    this.addSql('alter table "location" drop constraint if exists "location_type_check";')

    this.addSql('alter table "location" alter column "type" type text using ("type"::text);')
    this.addSql(
      "alter table \"location\" add constraint \"location_type_check\" check (\"type\" in ('view', 'internal', 'customer', 'inventory', 'production', 'transit', 'supplier'));"
    )
    this.addSql('alter table "location" alter column "type" drop not null;')
  }
}
