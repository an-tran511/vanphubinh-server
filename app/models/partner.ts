import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql'
import BaseEntity from '#models/base_entity'

@Entity()
export default class Partner extends BaseEntity<
  Partner,
  'address' | 'name' | 'phone' | 'email' | 'notes'
> {
  @PrimaryKey({
    type: 'text',
    defaultRaw: `lpad(nextval('partner_seq')::text,3,'0')`,
    primary: true,
    nullable: false,
  })
  id?: string

  @Property({ type: 'text' })
  name!: string

  @Property({ type: 'text' })
  address!: string

  @Property({ type: 'text' })
  phone!: string

  @Property({ type: 'text' })
  email!: string

  @Property({ type: 'text' })
  notes!: string

  @Property({ hidden: true })
  createdAt = new Date()

  @Property({ hidden: true, onUpdate: () => new Date() })
  updatedAt = new Date()
}
