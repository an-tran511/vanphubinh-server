import type { EntityManager } from '@mikro-orm/postgresql'
import Warehouse from '#models/warehouse'
import { Seeder } from '@mikro-orm/seeder'
import Location from '#models/location'

export default class LocationSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const warehouse = await em.findOne(Warehouse, {
      name: 'Vạn Phú Bình',
    })
    const physicalLocation = em.create(Location, {
      name: 'Địa điểm vật lý',
      warehouse: warehouse?.id,
      path: '',
      isScrapLocation: false,
      isReturnLocation: false,
      type: 'view',
    })

    const l1 = em.create(Location, {
      name: 'Kho',
      warehouse: warehouse?.id,
      parentLocation: physicalLocation.id,
      path: '',
      isScrapLocation: false,
      isReturnLocation: false,
      type: 'internal',
    })
    const l2 = em.create(Location, {
      name: 'Kho trục L1',
      warehouse: warehouse?.id,
      parentLocation: l1.id,
      path: 'Kho',
      isScrapLocation: false,
      isReturnLocation: false,
      type: 'internal',
    })
    for (let i = 1; i <= 10; i++) {
      em.create(Location, {
        name: `A${i}`,
        path: 'Kho / Kho trục L1',
        warehouse: warehouse?.id,
        parentLocation: l2.id,
        isScrapLocation: false,
        isReturnLocation: false,
        type: 'internal',
      })
    }
  }
}
