import { ListPageParams } from '#validators/list_page_params'
import { packagingRepository, em } from '#services/database_service'

export class PackagingService {
  async findMany({ searchValue, page, perPage }: ListPageParams) {
    const [packagings, total] = await packagingRepository.findAndCount(
      { name: { $ilike: `%${searchValue}%` } },
      { limit: perPage, offset: (page - 1) * perPage }
    )
    const lastPage = Math.ceil(total / perPage)
    return { data: packagings, meta: { total, page, perPage, lastPage } }
  }
}
