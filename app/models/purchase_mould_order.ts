import {
  Check,
  Entity,
  Enum,
  ManyToOne,
  type Opt,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql'
import Partner from '#models/partner'
import Mould from '#models/mould'
import BaseEntity from '#models/base_entity'

@Entity()
@Check({ expression: 'quantity >= 1' })
export default class PurchaseMouldOrder extends BaseEntity {
  @PrimaryKey({
    type: 'text',
    defaultRaw: `concat('LĐT',to_char(current_timestamp, 'YYMM'), '-', nextval('purchase_mould_order_seq'))`,
    primary: true,
    nullable: false,
  })
  id?: string

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

  @Property({ nullable: true })
  mouldIssueAt!: Opt<Date>

  @Enum({ type: 'PurchaseMouldOrderType' })
  type!: PurchaseMouldOrderType

  @Property({ type: 'text' })
  notes: string = ''

  @Enum({ type: 'PurchaseMouldOrderStatus' })
  status: PurchaseMouldOrderStatus = PurchaseMouldOrderStatus.NEW
}

export enum PurchaseMouldOrderStatus {
  NEW = 'new',
  MOULD_ISSUE = 'mould_issue',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PurchaseMouldOrderType {
  NEW = 'new',
  REPAIR = 'repair',
  REPLACE = 'replace',
  WARRANTY = 'warranty',
}
