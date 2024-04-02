import { Migration } from '@mikro-orm/migrations'

export class Migration20240402085846AlterTablePurchaseMouldOrder extends Migration {
  async up(): Promise<void> {
    this.addSql('create sequence if not exists "purchase_mould_order_seq";')
    this.addSql(
      'alter table "purchase_mould_order" drop constraint if exists "purchase_mould_order_type_check";'
    )
    this.addSql(
      'alter table "purchase_mould_order" drop constraint if exists "purchase_mould_order_status_check";'
    )

    this.addSql('alter table "purchase_mould_order" drop column "created_date";')

    this.addSql('alter table "purchase_mould_order" add column "mould_issue_at" timestamptz null;')
    this.addSql(
      'alter table "purchase_mould_order" alter column "id" type text using ("id"::text);'
    )
    this.addSql(
      "alter table \"purchase_mould_order\" alter column \"id\" set default concat('LĐT',to_char(current_timestamp, 'YYMM'), '-', nextval('purchase_mould_order_seq'));"
    )
    this.addSql(
      'alter table "purchase_mould_order" alter column "type" type text using ("type"::text);'
    )
    this.addSql(
      "alter table \"purchase_mould_order\" add constraint \"purchase_mould_order_type_check\" check (\"type\" in ('new', 'repair', 'replace', 'warranty'));"
    )
    this.addSql(
      'alter table "purchase_mould_order" alter column "status" type text using ("status"::text);'
    )
    this.addSql(
      "alter table \"purchase_mould_order\" add constraint \"purchase_mould_order_status_check\" check (\"status\" in ('new', 'mould_issue', 'ongoing', 'completed', 'cancelled'));"
    )
    this.addSql('alter table "purchase_mould_order" alter column "status" set default \'new\';')
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "purchase_mould_order" drop constraint if exists "purchase_mould_order_type_check";'
    )
    this.addSql(
      'alter table "purchase_mould_order" drop constraint if exists "purchase_mould_order_status_check";'
    )

    this.addSql('alter table "purchase_mould_order" drop column "mould_issue_at";')

    this.addSql(
      'alter table "purchase_mould_order" add column "created_date" timestamptz not null;'
    )
    this.addSql('alter table "purchase_mould_order" alter column "id" drop default;')
    this.addSql(
      'alter table "purchase_mould_order" alter column "id" type text using ("id"::text);'
    )
    this.addSql(
      'alter table "purchase_mould_order" alter column "type" type text using ("type"::text);'
    )
    this.addSql(
      'alter table "purchase_mould_order" add constraint "purchase_mould_order_type_check" check ("type" in (\'new\', \'repair\', \'replace\'));'
    )
    this.addSql(
      'alter table "purchase_mould_order" alter column "status" type text using ("status"::text);'
    )
    this.addSql(
      'alter table "purchase_mould_order" add constraint "purchase_mould_order_status_check" check ("status" in (\'draft\', \'confirmed\', \'cancelled\'));'
    )
    this.addSql('alter table "purchase_mould_order" alter column "status" set default \'draft\';')
    this.addSql('drop sequence if exists "purchase_mould_order_seq";')
  }
}
