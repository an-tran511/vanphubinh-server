import { ListPageParams } from '#validators/list_page_params'
import { purchaseMouldOrderRepository } from '#services/database_service'

export class PurchaseMouldOrder {
  async findMany({ searchValue, page, perPage }: ListPageParams) {
    const [uoms, total] = await purchaseMouldOrderRepository.findAndCount(
      { mould: { name: { $ilike: `%${searchValue}%` } } },
      { limit: perPage, offset: (page - 1) * perPage, populate: ['mould.name'] }
    )
    const lastPage = Math.ceil(total / perPage)
    return { data: uoms, meta: { total, page, perPage, lastPage } }
  }
}
