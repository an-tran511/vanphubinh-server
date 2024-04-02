import {
  Input,
  number,
  object,
  string,
  fallback,
  array,
  pick,
  merge,
  enum_,
  minValue,
} from 'valibot'
import { MouldInputSchema } from '#validators/mould'
import { PartnerInputSchema } from '#validators/partner'
import { PurchaseMouldOrderType } from '#models/purchase_mould_order'

export const PurchaseMouldOrderInputSchema = object({
  mould: merge([pick(MouldInputSchema, ['name', 'defaultSupplier']), object({ id: string() })]),
  supplier: merge([pick(PartnerInputSchema, ['name']), object({ id: string() })]),
  quantity: number([minValue(1)]),
  type: enum_(PurchaseMouldOrderType),
  notes: string(),
})

export const MultiplePurchaseMouldOrderInputSchema = object({
  orders: array(PurchaseMouldOrderInputSchema),
})

export type MultiplePurchaseMouldOrderInput = Input<typeof MultiplePurchaseMouldOrderInputSchema>

export type PurchaseMouldOrderInput = Input<typeof PurchaseMouldOrderInputSchema>
