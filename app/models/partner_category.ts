import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/postgresql'
import BaseEntity from '#models/base_entity'
import { nanoid } from '#utils/id_generator'
import Partner from '#models/partner'

@Entity()
export default class PartnerCategory extends BaseEntity {
  @PrimaryKey({ type: 'text', primary: true })
  id: string = nanoid()

  @Property({ type: 'text' })
  name!: string

  @Property({ type: 'text' })
  color!: string

  @ManyToMany(() => Partner, (parner) => parner.partnerCategories)
  partners = new Collection<Partner>(this)
}
