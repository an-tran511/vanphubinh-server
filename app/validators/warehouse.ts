import { Input, minLength, object, string } from 'valibot'

export const WarehouseInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
})

export type WarehouseInput = Input<typeof WarehouseInputSchema>
