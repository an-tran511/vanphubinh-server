import { ListPageParams } from '#validators/list_page_params'
import {
  mouldRepository,
  em,
  uomRepository,
  itemCategoryRepository,
} from '#services/database_service'
import { MouldInput, MultipleMouldsInput } from '#validators/mould'

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
        populate: ['uom', 'customer', 'itemCategory', 'defaultSupplier'],
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

  async storeMany(payload: MultipleMouldsInput) {
    const supplier = payload.defaultSupplier?.id
    const customer = payload.customer?.id
    const moulds = payload.moulds
    const mouldUom = await uomRepository.findOneOrFail({
      name: 'cây',
    })
    const mouldCategory = await itemCategoryRepository.findOneOrFail({
      name: 'Trục',
    })

    for (const mould of moulds) {
      const existingMoulds = await mouldRepository.findAndCount({
        packaging: { id: moulds[0].packaging?.id },
      })

      let mouldItemCode = ''
      if (mould.packaging?.itemCode) {
        const mouldsCount = existingMoulds[1] + 1
        mouldItemCode =
          mouldsCount > 1
            ? mould.packaging?.itemCode + `.${mouldsCount}`
            : mould.packaging?.itemCode
      }

      const newMould = mouldRepository.create({
        name: mould.name,
        uom: mouldUom,
        packaging: mould.packaging?.id,
        itemCode: mouldItemCode,
        customer,
        itemCategory: mouldCategory,
        defaultSupplier: supplier,
        isStockable: true,
        attributes: {
          dimension: mould.dimension,
          numberOfMoulds: mould.numberOfMoulds,
        },
      })
      em.persist(newMould)
    }

    await em.flush()
    return { success: true }
  }
}
