import { ListPageParams } from '#validators/list_page_params'
import { partnerRepository, em } from '#services/database_service'
import { PartnerInput } from '#validators/partner'
import Partner from '#models/partner'
import { wrap } from '@mikro-orm/postgresql'

export class PartnerService {
  async findMany({ searchValue, page, perPage }: ListPageParams) {
    const [partners, total] = await partnerRepository.findAndCount(
      { $or: [{ name: { $ilike: `%${searchValue}%` } }, { id: { $ilike: `%${searchValue}%` } }] },
      { limit: perPage, offset: (page - 1) * perPage }
    )
    const lastPage = Math.ceil(total / perPage)
    return { data: partners, meta: { total, page, perPage, lastPage } }
  }

  async findMouldMakers({ searchValue, page, perPage }: ListPageParams) {
    const [partners, total] = await partnerRepository.findAndCount(
      {
        $and: [
          { name: { $ilike: `%${searchValue}%` } },
          {
            partnerCategories: {
              name: 'Nhà trục',
            },
          },
        ],
      },
      { limit: perPage, offset: (page - 1) * perPage }
    )
    const lastPage = Math.ceil(total / perPage)
    return { data: partners, meta: { total, page, perPage, lastPage } }
  }

  async store(data: PartnerInput) {
    const partner = em.create(Partner, data)
    await em.persistAndFlush(partner)
    return partner
  }

  async findById(id: string) {
    const partner = partnerRepository.findOneOrFail(id)
    return partner
  }

  async update(id: string, data: PartnerInput) {
    const partner = await partnerRepository.findOneOrFail(id)
    wrap(partner).assign(data)
    await em.flush()
    return partner
  }
}
