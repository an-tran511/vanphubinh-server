import type { EntityManager } from '@mikro-orm/postgresql'
import Uom from '#models/uom'
import { Seeder } from '@mikro-orm/seeder'

export default class UomSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Uom, {
      name: 'cây',
    })
    em.create(Uom, {
      name: 'cái',
    })
    em.create(Uom, {
      name: 'kg',
    })
  }
}
