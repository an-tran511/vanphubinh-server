import {
  Input,
  object,
  string,
  number,
  merge,
  custom,
  toTrimmed,
  required,
  array,
  nullable,
  minLength,
  minValue,
  maxValue,
  pick,
  omit,
} from 'valibot'
import { ItemInputSchema } from '#validators/item'
import { dimensionRegex } from '#utils/string_matcher'
import { PartnerInputSchema } from '#validators/partner'
import { PackagingInputSchema } from '#validators/packaging'
import { LocationInputSchema } from '#validators/location'

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
export const MultipleMouldsInputSchema = object({
  defaultSupplier: required(
    merge([pick(PartnerInputSchema, ['name']), object({ id: string() })]),
    'Trường bắt buộc'
  ),
  customer: required(
    merge([pick(PartnerInputSchema, ['name']), object({ id: string() })]),
    'Trường bắt buộc'
  ),
  moulds: array(
    object({
      name: string([minLength(1, 'Trường bắt buộc')]),
      packaging: nullable(
        merge([pick(PackagingInputSchema, ['name', 'itemCode']), object({ id: string() })])
      ),
      dimension: string([
        toTrimmed(),
        custom(
          (input) => dimensionRegex.test(String(input)),
          'Kích thước phải có định dạng 123x123'
        ),
      ]),
      location: nullable(merge([pick(LocationInputSchema, ['name']), object({ id: string() })])),
      numberOfMoulds: number([minValue(1, 'Phải lớn hơn 1'), maxValue(13, 'Phải nhỏ hơn 13')]),
    })
  ),
})
export type MouldInput = Input<typeof MouldInputSchema>
export type MouldAttributesInput = Partial<Input<typeof MouldInputSchema>['attributes']>
export type MultipleMouldsInput = Input<typeof MultipleMouldsInputSchema>
