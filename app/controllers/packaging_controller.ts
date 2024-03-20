import type { HttpContext } from '@adonisjs/core/http'
import { PackagingService } from '#services/packaging_service'
import { inject } from '@adonisjs/core'
import { ListPageParamsSchema } from '#validators/list_page_params'
import { parse } from 'valibot'
import { PackagingInputSchema } from '#validators/packaging'

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

  async store({ request, response }: HttpContext) {
    const body = request.body()
    const payload = parse(PackagingInputSchema, body)
    try {
      const newPackaging = await this.packagingService.store(payload)
      return response.ok(newPackaging)
    } catch (e) {
      return response.internalServerError(e.message)
    }
  }

  async show({ request }: HttpContext) {
    const param = request.param('id')
    try {
      const packaging = await this.packagingService.show(param)
      return packaging
    } catch (e) {
      return e.message
    }
  }

  async update({ request }: HttpContext) {
    const param = request.param('id')
    const body = request.body()
    const payload = parse(PackagingInputSchema, body)
    try {
      const packaging = await this.packagingService.update(param, payload)
      return packaging
    } catch (e) {
      return e.message
    }
  }

  async destroy({}: HttpContext) {
    return 'Delete Packaging'
  }
}
