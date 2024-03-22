import env from '#start/env'
import { PostgreSqlDriver, Options } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import User from '#models/user'
import { SeedManager } from '@mikro-orm/seeder'
import { Migrator } from '@mikro-orm/migrations'
import { CustomMigrationGenerator } from '#database/custom_migrator'
import Uom from '#models/uom'
import ItemCategory from '#models/item_catgory'
import Partner from '#models/partner'
import Item from '#models/item'
import Packaging from '#models/packaging'
import Mould from '#models/mould'
import Location from '#models/location'
import Warehouse from '#models/warehouse'
import PurchaseMouldOrder from '#models/purchase_mould_order'
import PartnerCategory from '#models/partner_category'

const databaseConfig: Options = {
  entities: [
    User,
    Uom,
    ItemCategory,
    Partner,
    Item,
    Packaging,
    Mould,
    Warehouse,
    Location,
    PurchaseMouldOrder,
    PartnerCategory,
  ],
  host: env.get('DB_HOST'),
  port: Number(env.get('DB_PORT')) || 5432,
  user: env.get('DB_USER'),
  password: env.get('DB_PASSWORD'),
  dbName: env.get('DB_DATABASE'),
  metadataProvider: TsMorphMetadataProvider,
  debug: env.get('NODE_ENV') === 'development',
  driverOptions: {
    connection: { ssl: true },
  },
  extensions: [Migrator, SeedManager],
  driver: PostgreSqlDriver,
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: './database/migrations', // path to the folder with migrations
    pathTs: undefined, // path to the folder with TS migrations (if used, you should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: false, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: CustomMigrationGenerator, // migration generator, e.g. to allow custom formatting
    fileName: (timestamp: string, name?: string) => {
      if (!name) {
        throw new Error('Specify migration name via `node ace migration:create --name=...`')
      }

      return `${timestamp}_${name}`
    },
  },
  seeder: {
    path: '../database/seeders', // path to the folder with seeders
    pathTs: undefined, // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className.toLowerCase(), // seeder file naming convention
  },
}

export default databaseConfig
