import { ListPageParams } from '#validators/list_page_params'
import { uomRepository } from '#services/database_service'

export class UomService {
  async findMany({ searchValue, page, perPage }: ListPageParams) {
    const [uoms, total] = await uomRepository.findAndCount(
      { name: { $ilike: `%${searchValue}%` } },
      { limit: perPage, offset: (page - 1) * perPage }
    )
    const lastPage = Math.ceil(total / perPage)
    return { data: uoms, meta: { total, page, perPage, lastPage } }
  }
}
