import { Entity, Property } from '@mikro-orm/postgresql'
// import Mould from '#models/mould'
import Item from '#models/item'
import { type PackagingAttributesInput as PackagingAttributes } from '#validators/packaging'

@Entity({
  discriminatorValue: 'mould',
})
export default class Mould extends Item {
  @Property({ type: 'json', nullable: true })
  declare attributes: PackagingAttributes
}
