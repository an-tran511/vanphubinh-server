import { ListPageParams } from '#validators/list_page_params'
import { locationRepository } from '#services/database_service'

export class LocationService {
  async findMany({ searchValue, page, perPage }: ListPageParams) {
    const [uoms, total] = await locationRepository.findAndCount(
      { name: { $ilike: `%${searchValue}%` } },
      { limit: perPage, offset: (page - 1) * perPage }
    )
    const lastPage = Math.ceil(total / perPage)
    return { data: uoms, meta: { total, page, perPage, lastPage } }
  }
}
