import { nanoid } from '#utils/id_generator'
import { Check, Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/postgresql'
import Partner from '#models/partner'
import Mould from '#models/mould'
import BaseEntity from '#models/base_entity'

@Entity()
@Check({ expression: 'quantity >= 1' })
export default class PurchaseMouldOrder extends BaseEntity {
  @PrimaryKey({ type: 'text', primary: true })
  id: string = nanoid()

  @ManyToOne({
    entity: () => Partner,
  })
  supplier!: Partner

  @Property({ type: 'decimal' })
  quantity: number = 1

  @ManyToOne({
    entity: () => Mould,
  })
  mould!: Mould

  @Property()
  createdDate: Date = new Date()

  @Enum({ type: 'PurchaseMouldOrderType' })
  type!: PurchaseMouldOrderType

  @Property({ type: 'text' })
  notes: string = ''

  @Enum({ type: 'PurchaseMouldOrderStatus' })
  status: PurchaseMouldOrderStatus = PurchaseMouldOrderStatus.DRAFT
}

export enum PurchaseMouldOrderStatus {
  DRAFT = 'draft',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

export enum PurchaseMouldOrderType {
  NEW = 'new',
  REPAIR = 'repair',
  REPLACE = 'replace',
}
