import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import UserSeeder from '#database/seeders/user'
import UomSeeder from '#database/seeders/uom'
import ItemCategorySeeder from '#database/seeders/item_category'

export default class DatabaseSeeder extends Seeder {
  run(em: EntityManager): Promise<void> {
    return this.call(em, [UserSeeder, UomSeeder, ItemCategorySeeder])
  }
}
