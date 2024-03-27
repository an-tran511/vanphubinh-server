import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/postgresql'
import Item from '#models/item'
import Location from '#models/location'

@Entity()
export default class StockQuant {
  @ManyToOne({ entity: () => Item, primary: true })
  item!: Item

  @ManyToOne({ entity: () => Location, primary: true })
  location!: Location;

  [PrimaryKeyProp]?: ['item', 'location']

  constructor(item: Item, location: Location) {
    this.item = item
    this.location = location
  }

  @Property({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  quantity: number = 0

  @Property({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  reservedQuantity: number = 0

  @Property({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  availableQuantity: number = 0
}
