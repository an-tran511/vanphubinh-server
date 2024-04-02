import type { HttpContext } from '@adonisjs/core/http'
import { PurchaseMouldOrder } from '#services/purchase_mould_order_service'
import { inject } from '@adonisjs/core'
import { ListPageParamsSchema } from '#validators/list_page_params'
import { parse } from 'valibot'
import { MultiplePurchaseMouldOrderInputSchema } from '#validators/purchase_mould_order'

@inject()
export default class PurchaseMouldOrderController {
  constructor(protected purchaseMouldOrderService: PurchaseMouldOrder) {}

  async index({ response, request }: HttpContext) {
    const { page = 1, perPage = 30, searchValue = '' } = request.qs()
    const parsedParams = parse(ListPageParamsSchema, { page, perPage, searchValue })
    try {
      const uoms = await this.purchaseMouldOrderService.findMany(parsedParams)
      return response.ok(uoms)
    } catch (e) {
      return response.internalServerError(e.message)
    }
  }

  async store({}: HttpContext) {
    return 'Create PurchaseMouldOrder'
  }

  async storeMany({ request, response }: HttpContext) {
    const body = request.body()
    const payload = parse(MultiplePurchaseMouldOrderInputSchema, body)
    try {
      await this.purchaseMouldOrderService.storeMany(payload)
    } catch (e) {
      return response.internalServerError(e.message)
    }
    return response.ok({ message: 'ok' })
  }

  async show({}: HttpContext) {
    return 'Show PurchaseMouldOrder'
  }

  async update({}: HttpContext) {
    return 'Update PurchaseMouldOrder'
  }

  async destroy({}: HttpContext) {
    return 'Delete PurchaseMouldOrder'
  }
}
