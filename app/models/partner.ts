import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/postgresql'
import BaseEntity from '#models/base_entity'

@Entity()
export default class Partner extends BaseEntity {
  @PrimaryKey({
    type: 'text',
    defaultRaw: `lpad(nextval('partner_seq')::text,4,'0')`,
    primary: true,
    nullable: false,
  })
  id?: string

  @Property({ type: 'text' })
  @Index({ type: 'fulltext' })
  name!: string

  @Property({ type: 'text', nullable: true })
  address!: string | null

  @Property({ type: 'text', nullable: true })
  phone!: string | null

  @Property({ type: 'text', nullable: true })
  email!: string | null

  @Property({ type: 'text', nullable: true })
  notes!: string | null

  @Property({ hidden: true })
  createdAt = new Date()

  @Property({ hidden: true, onUpdate: () => new Date() })
  updatedAt = new Date()
}
