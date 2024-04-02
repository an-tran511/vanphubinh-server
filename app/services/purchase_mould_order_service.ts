import { ListPageParams } from '#validators/list_page_params'
import { em, purchaseMouldOrderRepository } from '#services/database_service'
import { MultiplePurchaseMouldOrderInput } from '#validators/purchase_mould_order'
import { PurchaseMouldOrderStatus } from '#models/purchase_mould_order'

export class PurchaseMouldOrder {
  async findMany({ searchValue, page, perPage }: ListPageParams) {
    const [uoms, total] = await purchaseMouldOrderRepository.findAndCount(
      { mould: { name: { $ilike: `%${searchValue}%` } } },
      {
        limit: perPage,
        offset: (page - 1) * perPage,
        fields: [
          'id',
          'mould.name',
          'type',
          'status',
          'supplier.name',
          'quantity',
          'notes',
          'createdAt',
        ],
      }
    )
    const lastPage = Math.ceil(total / perPage)
    return { data: uoms, meta: { total, page, perPage, lastPage } }
  }

  async storeMany(payload: MultiplePurchaseMouldOrderInput) {
    const { orders } = payload
    const purchaseMouldOrders = orders.map((order) => {
      return purchaseMouldOrderRepository.create({
        ...order,
        mould: order.mould.id,
        supplier: order.supplier.id,
        status: PurchaseMouldOrderStatus.NEW,
      })
    })
    await em.persistAndFlush(purchaseMouldOrders)
  }
}
