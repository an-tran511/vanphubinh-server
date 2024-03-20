import { Input, object, string, number, merge, omit, custom, toTrimmed } from 'valibot'
import { ItemInputSchema } from '#validators/item'
import { dimensionRegex } from '#utils/string_matcher'

export const PackagingInputSchema = merge([
  omit(ItemInputSchema, ['isStockable']),
  object({
    attributes: object({
      dimension: string([
        toTrimmed(),
        custom((input) => dimensionRegex.test(String(input)), 'Invalid dimension'),
      ]),
      spreadDimension: string([
        toTrimmed(),
        custom((input) => dimensionRegex.test(String(input)), 'Invalid dimension'),
      ]),
      thickness: number(),
      numberOfColors: number(),
      filmWidth: number(),
    }),
  }),
])
export type PackagingInput = Input<typeof PackagingInputSchema>
export type PackagingAttributesInput = Partial<Input<typeof PackagingInputSchema>['attributes']>
