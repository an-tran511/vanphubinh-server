import type { EntityManager } from '@mikro-orm/postgresql'
import Warehouse from '#models/warehouse'
import { Seeder } from '@mikro-orm/seeder'

export default class WarehouseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Warehouse, {
      name: 'Vạn Phú Bình',
    })
  }
}
