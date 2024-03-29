import { Collection, Entity, OneToMany, Property } from '@mikro-orm/postgresql'
// import Mould from '#models/mould'
import Item from '#models/item'
import { type PackagingAttributesInput as PackagingAttributes } from '#validators/packaging'
import Mould from './mould.js'

@Entity({
  discriminatorValue: 'packaging',
})
export default class Packaging extends Item {
  @OneToMany({
    entity: () => Mould,
    mappedBy: 'packaging',
  })
  items = new Collection<Mould>(this)

  @Property({ type: 'json', nullable: true })
  declare attributes: PackagingAttributes
}
