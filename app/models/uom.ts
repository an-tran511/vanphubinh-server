import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql'
import BaseEntity from '#models/base_entity'
import { nanoid } from '#utils/id_generator'

@Entity()
export default class Uom extends BaseEntity {
  constructor(name: string) {
    super()
    this.name = name
  }

  @PrimaryKey({ type: 'text', primary: true })
  id: string = nanoid()

  @Property({ type: 'text' })
  name!: string
}
