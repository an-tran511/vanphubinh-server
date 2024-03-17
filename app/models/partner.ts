import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql'
import BaseEntity from '#models/base_entity'
import { nanoid } from '#utils/id_generator'

@Entity()
export default class Partner extends BaseEntity {
  @PrimaryKey({ type: 'text' })
  id: string = nanoid()

  @Property({ type: 'text' })
  name!: string

  @Property({ type: 'text', nullable: true })
  address?: string | null

  @Property({ type: 'text', nullable: true })
  phone?: string | null

  @Property({ type: 'text', nullable: true })
  email?: string | null

  @Property({ type: 'text', nullable: true })
  notes?: string | null

  @Property({ hidden: true })
  createdAt = new Date()

  @Property({ hidden: true, onUpdate: () => new Date() })
  updatedAt = new Date()
}
