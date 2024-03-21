import { ListPageParams } from '#validators/list_page_params'
import { em, locationRepository } from '#services/database_service'
import { LocationInput } from '#validators/location'

export class LocationService {
  async findMany({ searchValue, page, perPage }: ListPageParams) {
    const [uoms, total] = await locationRepository.findAndCount(
      { name: { $ilike: `%${searchValue}%` } },
      {
        limit: perPage,
        offset: (page - 1) * perPage,
        populate: ['warehouse.name', 'parentLocation.name'],
      }
    )
    const lastPage = Math.ceil(total / perPage)
    return { data: uoms, meta: { total, page, perPage, lastPage } }
  }

  async store(data: LocationInput) {
    const location = locationRepository.create({
      ...data,
      path:
        data.parentLocation?.path &&
        data.parentLocation?.path.length > 0 &&
        data.parentLocation?.type !== 'view'
          ? `${data.parentLocation.path} / ${data.parentLocation.name}`
          : '',
      warehouse: data.warehouse?.id,
      parentLocation: data.parentLocation?.id,
    })
    await em.persistAndFlush(location)
    return location
  }
}
