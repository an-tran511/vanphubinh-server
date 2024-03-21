import type { HttpContext } from '@adonisjs/core/http'
import { WarehouseService } from '#services/warehouse_service'
import { inject } from '@adonisjs/core'
import { ListPageParamsSchema } from '#validators/list_page_params'
import { parse } from 'valibot'

@inject()
export default class WarehouseController {
  constructor(protected warehouseService: WarehouseService) {}

  async index({ response, request }: HttpContext) {
    const { page = 1, perPage = 30, searchValue = '' } = request.qs()
    const parsedParams = parse(ListPageParamsSchema, { page, perPage, searchValue })
    try {
      const warehouses = await this.warehouseService.findMany(parsedParams)
      return response.ok(warehouses)
    } catch (e) {
      return response.internalServerError(e.message)
    }
  }

  async store({}: HttpContext) {
    return 'Create Warehouse'
  }

  async show({}: HttpContext) {
    return 'Show Warehouse'
  }

  async update({}: HttpContext) {
    return 'Update Warehouse'
  }

  async destroy({}: HttpContext) {
    return 'Delete Warehouse'
  }
}
