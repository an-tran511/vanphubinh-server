import { ListPageParams } from '#validators/list_page_params'
import { packagingRepository, em } from '#services/database_service'
import { PackagingInput } from '#validators/packaging'

export class PackagingService {
  async findMany({ searchValue, page, perPage }: ListPageParams) {
    const [packagings, total] = await packagingRepository.findAndCount(
      { name: { $ilike: `%${searchValue}%` } },
      { limit: perPage, offset: (page - 1) * perPage }
    )
    const lastPage = Math.ceil(total / perPage)
    return { data: packagings, meta: { total, page, perPage, lastPage } }
  }

  async store(payload: PackagingInput) {
    const customerId = payload.customer?.id ?? null
    const itemCode = await this.getPackagingItemCode(customerId)
    const packaging = packagingRepository.create({
      ...payload,
      itemCode,
      uom: payload.uom?.id,
      customer: payload.customer?.id,
      itemCategory: payload.itemCategory?.id,
      isStockable: true,
    })
    await em.persistAndFlush(packaging)
    return packaging
  }

  private async getPackagingItemCode(customerId: string | null) {
    const ordNumber = await em
      .getConnection()
      .execute("select lpad(nextval('partner_seq')::text,7,'0') as nextval")
    const itemCode = customerId
      ? `${customerId}-${ordNumber[0].nextval}`
      : `000-${ordNumber[0].nextval}`
    return itemCode
  }
}
