import { ListPageParams } from '#validators/list_page_params'
import { mouldRepository, em } from '#services/database_service'
import { MouldInput } from '#validators/mould'

export class MouldService {
  async findMany({ searchValue, page, perPage }: ListPageParams) {
    const [moulds, total] = await mouldRepository.findAndCount(
      {
        $or: [
          { name: { $ilike: `%${searchValue}%` } },
          { itemCode: { $ilike: `%${searchValue}%` } },
        ],
      },
      {
        limit: perPage,
        offset: (page - 1) * perPage,
        populate: ['uom', 'customer', 'itemCategory'],
      }
    )
    const lastPage = Math.ceil(total / perPage)
    return { data: moulds, meta: { total, page, perPage, lastPage } }
  }

  async store(payload: MouldInput) {
    const mould = mouldRepository.create({
      ...payload,
      uom: payload.uom?.id,
      customer: payload.customer?.id,
      itemCategory: payload.itemCategory?.id,
      isStockable: true,
    })
    await em.persistAndFlush(mould)
    return mould
  }

  async show(id: string) {
    return await mouldRepository.findOneOrFail(id, {
      populate: ['uom', 'customer', 'itemCategory'],
    })
  }

  async update(id: string, data: MouldInput) {
    const mould = await mouldRepository.findOneOrFail(id)
    mouldRepository.assign(mould, {
      ...data,
      uom: data.uom?.id,
      customer: data.customer?.id,
      itemCategory: data.itemCategory?.id,
    })
    await em.flush()
    await mouldRepository.populate(mould, ['uom', 'customer', 'itemCategory'])
    return mould
  }
}
