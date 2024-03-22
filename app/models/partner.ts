import {
  Entity,
  type Opt,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  ManyToMany,
} from '@mikro-orm/postgresql'
import BaseEntity from '#models/base_entity'
import PartnerCategory from '#models/partner_category'

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

  @ManyToMany(() => PartnerCategory, 'partners', { owner: true })
  partnerCategories = new Collection<PartnerCategory>(this)
}
