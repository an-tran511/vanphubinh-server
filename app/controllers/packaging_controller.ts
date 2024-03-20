import type { HttpContext } from '@adonisjs/core/http'
import { PackagingService } from '#services/packaging_service'
import { inject } from '@adonisjs/core'
import { ListPageParamsSchema } from '#validators/list_page_params'
import { parse } from 'valibot'

@inject()
export default class PackagingController {
  constructor(protected packagingService: PackagingService) {}

  async index({ response, request }: HttpContext) {
    const { page = 1, perPage = 30, searchValue = '' } = request.qs()
    const parsedParams = parse(ListPageParamsSchema, { page, perPage, searchValue })
    try {
      const packagings = await this.packagingService.findMany(parsedParams)
      return response.ok(packagings)
    } catch (e) {
      return response.internalServerError(e.message)
    }
  }

  async store({}: HttpContext) {
    return 'Create Packaging'
  }

  async show({}: HttpContext) {
    return 'Show Packaging'
  }

  async update({}: HttpContext) {
    return 'Update Packaging'
  }

  async destroy({}: HttpContext) {
    return 'Delete Packaging'
  }
}
