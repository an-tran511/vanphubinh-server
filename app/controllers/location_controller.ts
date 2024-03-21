import type { HttpContext } from '@adonisjs/core/http'
import { LocationService } from '#services/location_service'
import { inject } from '@adonisjs/core'
import { ListPageParamsSchema } from '#validators/list_page_params'
import { parse } from 'valibot'

@inject()
export default class LocationController {
  constructor(protected locationService: LocationService) {}

  async index({ response, request }: HttpContext) {
    const { page = 1, perPage = 30, searchValue = '' } = request.qs()
    const parsedParams = parse(ListPageParamsSchema, { page, perPage, searchValue })
    try {
      const locations = await this.locationService.findMany(parsedParams)
      return response.ok(locations)
    } catch (e) {
      return response.internalServerError(e.message)
    }
  }

  async store({}: HttpContext) {
    return 'Create Location'
  }

  async show({}: HttpContext) {
    return 'Show Location'
  }

  async update({}: HttpContext) {
    return 'Update Location'
  }

  async destroy({}: HttpContext) {
    return 'Delete Location'
  }
}
