import type { HttpContext } from '@adonisjs/core/http'
import { UomService } from '#services/uom_service'
import { inject } from '@adonisjs/core'
import { ListPageParamsSchema } from '#validators/list_page_params'
import { parse } from 'valibot'

@inject()
export default class UomController {
  constructor(protected uomService: UomService) {}

  async index({ response, request }: HttpContext) {
    const { page = 1, perPage = 30, searchValue = '' } = request.qs()
    const parsedParams = parse(ListPageParamsSchema, { page, perPage, searchValue })
    try {
      const uoms = await this.uomService.findMany(parsedParams)
      return response.ok(uoms)
    } catch (e) {
      return response.internalServerError(e.message)
    }
  }

  async store({}: HttpContext) {
    return 'Create Uom'
  }

  async show({}: HttpContext) {
    return 'Show Uom'
  }

  async update({}: HttpContext) {
    return 'Update Uom'
  }

  async destroy({}: HttpContext) {
    return 'Delete Uom'
  }
}
