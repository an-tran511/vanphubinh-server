import {
  Input,
  email,
  union,
  minLength,
  object,
  nullable,
  string,
  toTrimmed,
  literal,
} from 'valibot'

export const PartnerInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
  phone: nullable(string()),
  email: nullable(union([string([toTrimmed(), email('Email không hợp lệ')]), literal('')])),
  address: nullable(string()),
  notes: nullable(string()),
})

export type PartnerInput = Input<typeof PartnerInputSchema>
