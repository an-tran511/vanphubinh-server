import { Input, object, string, number, merge, omit, custom, toTrimmed } from 'valibot'
import { ItemInputSchema } from '#validators/item'
import { dimensionRegex } from '#utils/string_matcher'

export const MouldInputSchema = merge([
  omit(ItemInputSchema, ['isStockable']),
  object({
    attributes: object({
      dimension: string([
        custom(
          (input) => dimensionRegex.test(String(input)),
          'Kích thước phải có định dạng 123x123'
        ),
      ]),
      numberOfMoulds: number(),
    }),
  }),
])
export type MouldInput = Input<typeof MouldInputSchema>
export type MouldAttributesInput = Partial<Input<typeof MouldInputSchema>['attributes']>
