import type { HttpContext } from '@adonisjs/core/http'
import { PartnerService } from '#services/partner_service'
import { inject } from '@adonisjs/core'
import { ListPageParamsSchema } from '#validators/list_page_params'
import { parse } from 'valibot'
import { PartnerInputSchema } from '#validators/partner'

@inject()
export default class PartnerController {
  constructor(protected partnerService: PartnerService) {}

  async index({ response, request }: HttpContext) {
    const { page = 1, perPage = 30, searchValue = '' } = request.qs()
    const parsedParams = parse(ListPageParamsSchema, { page, perPage, searchValue })
    try {
      const partners = await this.partnerService.findMany(parsedParams)
      return response.ok(partners)
    } catch (e) {
      return response.internalServerError(e.message)
    }
  }

  async store({ request }: HttpContext) {
    const data = request.all()
    const payload = parse(PartnerInputSchema, data)
    const partner = await this.partnerService.store(payload)
    return partner
  }

  async show({ request, response }: HttpContext) {
    const id = request.param('id')
    try {
      const partner = await this.partnerService.findById(id)
      return response.ok(partner)
    } catch (e) {
      return response.internalServerError(e.message)
    }
  }

  async update({ request, response }: HttpContext) {
    const id = request.param('id')
    const data = request.body()
    const payload = parse(PartnerInputSchema, data)

    try {
      const partner = await this.partnerService.update(id, payload)
      return response.ok(partner)
    } catch (e) {
      return response.internalServerError(e.message)
    }
  }

  async destroy({}: HttpContext) {
    return 'Delete Partner'
  }
}
