import { nanoid } from '#utils/id_generator'
import {
  Entity,
  Enum,
  ManyToOne,
  type Opt,
  PrimaryKey,
  Property,
  type Rel,
} from '@mikro-orm/postgresql'
import Uom from '#models/uom'
import Partner from '#models/partner'
import BaseEntity from '#models/base_entity'
import ItemCategory from '#models/item_catgory'

@Entity({
  discriminatorColumn: 'type',
})
export default class Item extends BaseEntity {
  @PrimaryKey({ type: 'text', primary: true })
  id: string = nanoid()

  @Property({ type: 'text' })
  name!: string

  @ManyToOne({
    entity: () => Uom,
  })
  uom!: Rel<Uom>

  @ManyToOne({
    entity: () => Partner,
    nullable: true,
  })
  customer!: Rel<Partner> | null

  @ManyToOne({
    entity: () => ItemCategory,
    nullable: true,
  })
  itemCategory!: Rel<ItemCategory> | null

  @ManyToOne({
    entity: () => Partner,
    nullable: true,
  })
  defaultSupplier!: Rel<Partner> | null

  @Property({
    type: 'text',
  })
  itemCode: Opt<string> = ''

  @Property({ default: true })
  isStockable!: boolean

  @Property({ type: 'text' })
  notes: Opt<string> = ''

  @Property({ type: 'json' })
  attributes?: Opt<object>

  @Enum({ nullable: true })
  type!: 'packaging' | null
}
