import { Entity, ManyToOne, Property, Rel } from '@mikro-orm/postgresql'
// import Mould from '#models/mould'
import Item from '#models/item'
import { type MouldAttributesInput as MouldAttributes } from '#validators/mould'
import Packaging from './packaging.js'

@Entity({
  discriminatorValue: 'mould',
})
export default class Mould extends Item {
  @ManyToOne({
    entity: () => Packaging,
    nullable: true,
  })
  packaging!: Rel<Packaging> | null

  @Property({ type: 'json', nullable: true })
  declare attributes: MouldAttributes
}
