import { nanoid } from '#utils/id_generator'
import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/postgresql'
import Uom from '#models/uom'
import Partner from '#models/partner'
import BaseEntity from '#models/base_entity'
import ItemCategory from '#models/item_catgory'

@Entity({
  discriminatorColumn: 'type',
  discriminatorMap: { packaging: 'Packaging', mould: 'Mould' },
})
export default class Item extends BaseEntity {
  @PrimaryKey({ type: 'text', primary: true })
  id: string = nanoid()

  @Property({ type: 'text' })
  name!: string

  @ManyToOne({
    entity: () => Uom,
  })
  uom!: Uom

  @ManyToOne({
    entity: () => Partner,
    nullable: true,
  })
  customer!: Partner | null

  @ManyToOne({
    entity: () => ItemCategory,
    nullable: true,
  })
  itemCategory!: ItemCategory | null

  @ManyToOne({
    entity: () => Partner,
    nullable: true,
  })
  defaultSupplier!: Partner | null

  @Property({ type: 'text', unique: true })
  itemCode!: string

  @Property()
  isStockable!: boolean

  @Property({ type: 'text' })
  note!: string

  @Property({ type: 'json' })
  attributes?: object

  @Enum({ nullable: true })
  type!: 'packaging' | null
}
