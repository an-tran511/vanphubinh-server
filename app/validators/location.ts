import { Input, boolean, merge, minLength, nullable, object, picklist, string } from 'valibot'
import { WarehouseInputSchema } from './warehouse.js'

export const LocationInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
  warehouse: merge([WarehouseInputSchema, object({ id: string() })]),
  parentLocation: nullable(
    object({
      id: string(),
      name: string(),
      path: string(),
      type: picklist([
        'view',
        'internal',
        'customer',
        'inventory',
        'production',
        'transit',
        'supplier',
      ]),
    })
  ),
  isReturnLocation: boolean(),
  isScrapLocation: boolean(),
  type: picklist([
    'view',
    'internal',
    'customer',
    'inventory',
    'production',
    'transit',
    'supplier',
  ]),
})

export type LocationInput = Input<typeof LocationInputSchema>
