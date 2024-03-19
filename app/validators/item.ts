import { Input, minLength, object, nullable, string, merge } from 'valibot'
import { PartnerInputSchema } from './partner.js'
import { UomInputSchema } from './uom.js'

export const ItemInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
  uom: merge([UomInputSchema, object({ id: string() })]),
  customer: nullable(merge([PartnerInputSchema, object({ id: string() })])),
  // itemCategory: nullable(string([minLength(1, 'Giá trị không hợp lệ')])),
  // defaultSupplier: nullable(string([minLength(1, 'Giá trị không hợp lệ')])),
  // notes: nullable(string()),
  // isStockable: nullable(boolean()),
  // itemCode: nullable(string()),
  // attributes: nullable(object({})),
})

export const UpdateItemInputSchema = merge([ItemInputSchema, object({ id: nullable(string()) })])

export type ItemInput = Input<typeof ItemInputSchema>
