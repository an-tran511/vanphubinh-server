import { ListPageParams } from '#validators/list_page_params'
import { partnerRepository, em } from '#services/database_service'
import { PartnerInput, PartnerInputSchema } from '#validators/partner'
import Partner from '#models/partner'
import { parse } from 'valibot'

export class PartnerService {
  async findMany({ searchValue, page, perPage }: ListPageParams) {
    const [uoms, total] = await partnerRepository.findAndCount(
      { name: { $ilike: `%${searchValue}%` } },
      { limit: perPage, offset: (page - 1) * perPage }
    )
    const lastPage = Math.ceil(total / perPage)
    return { data: uoms, meta: { total, page, perPage, lastPage } }
  }

  async store(data: PartnerInput) {
    const partner = em.create(Partner, data)
    await em.persistAndFlush(partner)
    return partner
  }
}
