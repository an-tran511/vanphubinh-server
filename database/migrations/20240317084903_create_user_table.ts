import { Migration } from '@mikro-orm/migrations'

export class Migration20240317084903CreateUserTable extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "user" (
        "email" text not null,
        "password" text not null,
        "name" text not null,
        "created_at" timestamptz not null,
        "updated_at" timestamptz not null,
        constraint "user_pkey" primary key ("email")
      );`
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;')
  }
}
