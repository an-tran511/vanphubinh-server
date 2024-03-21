import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import UserSeeder from '#database/seeders/user'
import UomSeeder from '#database/seeders/uom'
import ItemCategorySeeder from '#database/seeders/item_category'
import WarehouseSeeder from '#database/seeders/warehouse'
import LocationSeeder from '#database/seeders/location'

export default class DatabaseSeeder extends Seeder {
  run(em: EntityManager): Promise<void> {
    return this.call(em, [
      UserSeeder,
      UomSeeder,
      ItemCategorySeeder,
      WarehouseSeeder,
      LocationSeeder,
    ])
  }
}
