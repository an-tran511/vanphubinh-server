import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/postgresql'
import BaseEntity from '#models/base_entity'
import { nanoid } from '#utils/id_generator'
import Location from './location.js'

@Entity()
export default class Warehouse extends BaseEntity {
  @PrimaryKey({ type: 'text', primary: true })
  id: string = nanoid()

  @Property({ type: 'text' })
  name!: string

  @OneToMany(() => Location, (location) => location.warehouse)
  locations = new Collection<Location>(this)
}
