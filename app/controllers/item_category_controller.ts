import type { HttpContext } from '@adonisjs/core/http'
import { ItemCategoryService } from '#services/item_category_service'
import { inject } from '@adonisjs/core'
import { ListPageParamsSchema } from '#validators/list_page_params'
import { parse } from 'valibot'

@inject()
export default class ItemCategoryController {
  constructor(protected itemCategoryService: ItemCategoryService) {}

  async index({ response, request }: HttpContext) {
    const { page = 1, perPage = 30, searchValue = '' } = request.qs()
    const parsedParams = parse(ListPageParamsSchema, { page, perPage, searchValue })
    try {
      const itemCategories = await this.itemCategoryService.findMany(parsedParams)
      return response.ok(itemCategories)
    } catch (e) {
      return response.internalServerError(e.message)
    }
  }

  async store({}: HttpContext) {
    return 'Create ItemCategory'
  }

  async show({}: HttpContext) {
    return 'Show ItemCategory'
  }

  async update({}: HttpContext) {
    return 'Update ItemCategory'
  }

  async destroy({}: HttpContext) {
    return 'Delete ItemCategory'
  }
}
