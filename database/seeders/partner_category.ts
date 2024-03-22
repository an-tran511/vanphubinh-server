import PartnerCategory from '#models/partner_category'
import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'

export default class PartnerCategorySeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const partnerCategoryRepository = em.getRepository(PartnerCategory)
    const cat = partnerCategoryRepository.create({ name: 'Nhà trục', color: '#87c9e6' })
    await em.persistAndFlush([cat])
  }
}
