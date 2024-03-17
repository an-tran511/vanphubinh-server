import { object, number, string, Input, coerce } from 'valibot'

export const ListPageParamsSchema = object({
  page: coerce(number(), (value) => Number(value)),
  perPage: number(),
  searchValue: string(),
})

export type ListPageParams = Input<typeof ListPageParamsSchema> // number
