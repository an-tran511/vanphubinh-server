import type { HttpContext } from '@adonisjs/core/http'
import { MouldService } from '#services/mould_service'
import { inject } from '@adonisjs/core'
import { ListPageParamsSchema } from '#validators/list_page_params'
import { parse } from 'valibot'
import { MouldInputSchema, MultipleMouldsInputSchema } from '#validators/mould'

@inject()
export default class MouldController {
  constructor(protected mouldService: MouldService) {}

  async index({ response, request }: HttpContext) {
    const { page = 1, perPage = 30, searchValue = '' } = request.qs()
    const parsedParams = parse(ListPageParamsSchema, { page, perPage, searchValue })
    try {
      const moulds = await this.mouldService.findMany(parsedParams)
      return response.ok(moulds)
    } catch (e) {
      return response.internalServerError(e.message)
    }
  }

  async store({ request, response }: HttpContext) {
    const body = request.body()
    const payload = parse(MouldInputSchema, body)
    try {
      const newMould = await this.mouldService.store(payload)
      return response.ok(newMould)
    } catch (e) {
      return response.internalServerError(e.message)
    }
  }

  async storeMany({ request, response }: HttpContext) {
    const body = request.body()
    const payload = parse(MultipleMouldsInputSchema, body)
    try {
      const newMoulds = await this.mouldService.storeMany(payload)
      return response.ok(newMoulds)
    } catch (e) {
      return response.internalServerError(e.message)
    }
  }

  async show({ request }: HttpContext) {
    const param = request.param('id')
    try {
      const mould = await this.mouldService.show(param)
      return mould
    } catch (e) {
      return e.message
    }
  }

  async update({ request }: HttpContext) {
    const param = request.param('id')
    const body = request.body()
    const payload = parse(MouldInputSchema, body)
    try {
      const mould = await this.mouldService.update(param, payload)
      return mould
    } catch (e) {
      return e.message
    }
  }

  async destroy({}: HttpContext) {
    return 'Delete Mould'
  }
}
