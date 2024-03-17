import { ListPageParams } from '#validators/list_page_params'
import { itemCategoryRepository } from '#services/database_service'

export class ItemCategoryService {
  async findMany({ searchValue, page, perPage }: ListPageParams) {
    const [itemCategories, total] = await itemCategoryRepository.findAndCount(
      { name: { $ilike: `%${searchValue}%` } },
      {
        limit: perPage,
        offset: (page - 1) * perPage,
      }
    )
    const lastPage = Math.ceil(total / perPage)
    return { data: itemCategories, meta: { total, page, perPage, lastPage } }
  }
}
