import { Entity, type Opt, PrimaryKey, Property } from '@mikro-orm/postgresql'
import BaseEntity from '#models/base_entity'

@Entity()
export default class Partner extends BaseEntity {
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
  address: Opt<string> = ''

  @Property({ type: 'text' })
  phone: Opt<string> = ''

  @Property({ type: 'text' })
  email: Opt<string> = ''

  @Property({ type: 'text' })
  notes: Opt<string> = ''
}
