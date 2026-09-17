import { Migration } from '@mikro-orm/migrations';

export class Migration20260917184045 extends Migration {
  override name = 'Migration20260917184045';

  override up(): void | Promise<void> {
    this.addSql(
      `create table "items" (
        "id" serial primary key,
        "title" varchar(255) not null,
        "price" numeric(10,2) not null check ("price" >= 0)
      );`,
    );

    this.addSql(
      `create table "users" (
        "id" serial primary key,
        "balance" numeric(12,2) not null default '0.00' check ("balance" >= 0)
      );`,
    );

    this.addSql(
      `create table "balance_histories" (
        "id" serial primary key,
        "action" text not null,
        "amount" numeric(12,2) not null check ("amount" > 0),
        "ts" timestamptz not null default now(),
        "user_id" int not null,
        "item_id" int null
      );`,
    );

    this.addSql(
      `alter table "balance_histories"
      add constraint "balance_histories_action_check"
      check ("action" in ('deposit', 'payment'));`,
    );

    this.addSql(
      `alter table "balance_histories"
      add constraint "balance_histories_user_id_foreign"
      foreign key ("user_id") references "users" ("id") on delete cascade;`,
    );
    this.addSql(
      `alter table "balance_histories"
      add constraint "balance_histories_item_id_foreign"
      foreign key ("item_id") references "items" ("id") on delete set null;`,
    );

    // initial data:

    this.addSql(`insert into "users" ("id", "balance") values (1, 1000.00);`);
    this.addSql(`select setval('users_id_seq', (select max("id") from "users"));`);

    this.addSql(`insert into "items" ("id", "title", "price") values (1, 'Default item', 100.00);`);
    this.addSql(`select setval('items_id_seq', (select max("id") from "items"));`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "balance_histories" cascade;`);
    this.addSql(`drop table if exists "users" cascade;`);
    this.addSql(`drop table if exists "items" cascade;`);
  }
}
