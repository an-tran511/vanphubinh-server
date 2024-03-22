import Partner from '#models/partner'
import PartnerCategory from '#models/partner_category'
import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'

export default class PartnerSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const partnerRepository = em.getRepository(Partner)
    const mouldMakerTag = await em.findOneOrFail(PartnerCategory, {
      name: 'Nhà trục',
    })
    const par1 = partnerRepository.create({
      name: 'Dương Quang',
      partnerCategories: [mouldMakerTag],
    })

    const par2 = partnerRepository.create({ name: 'Hoàng Hạc', partnerCategories: [mouldMakerTag] })
    const par3 = partnerRepository.create({
      name: 'Dongyun Long An',
      partnerCategories: [mouldMakerTag],
    })

    await em.persistAndFlush([par1, par2, par3])
  }
}
