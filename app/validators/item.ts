import {
  Input,
  minLength,
  object,
  nullable,
  string,
  merge,
  required,
  boolean,
  fallback,
  pick,
} from 'valibot'
import { PartnerInputSchema } from './partner.js'
import { UomInputSchema } from './uom.js'
import { ItemCategoryInputSchema } from './item_category.js'

export const ItemInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
  uom: required(merge([UomInputSchema, object({ id: string() })]), 'Trường bắt buộc'),
  customer: nullable(merge([pick(PartnerInputSchema, ['name']), object({ id: string() })])),
  itemCategory: nullable(merge([ItemCategoryInputSchema, object({ id: string() })])),
  defaultSupplier: nullable(merge([pick(PartnerInputSchema, ['name']), object({ id: string() })])),
  notes: fallback(string(), ''),
  isStockable: boolean(),
  itemCode: fallback(string(), ''),
})

export const UpdateItemInputSchema = merge([ItemInputSchema, object({ id: nullable(string()) })])

export type ItemInput = Input<typeof ItemInputSchema>
