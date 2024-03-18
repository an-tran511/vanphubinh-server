import { Input, email, union, minLength, object, string, toTrimmed, literal } from 'valibot'

export const PartnerInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
  phone: string(),
  email: union([string([toTrimmed(), email('Email không hợp lệ')]), literal('')]),
  address: string(),
  notes: string(),
})

export type PartnerInput = Input<typeof PartnerInputSchema>
