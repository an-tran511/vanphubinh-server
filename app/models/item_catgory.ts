import {
  Collection,
  Entity,
  Formula,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql'
import BaseEntity from '#models/base_entity'
import { nanoid } from '#utils/id_generator'

@Entity()
export default class ItemCategory extends BaseEntity {
  @PrimaryKey({ type: 'text' })
  id: string = nanoid()

  @Property({ type: 'text' })
  name!: string

  @ManyToOne({
    entity: () => ItemCategory,
    nullable: true,
  })
  parentItemCategory?: ItemCategory

  @OneToMany({
    entity: () => ItemCategory,
    mappedBy: 'parentItemCategory',
  })
  childrenItemCategories = new Collection<ItemCategory>(this)

  @Property({ type: 'text' })
  path!: string

  @Formula(
    `(case when "parent_item_category_id" is not null then path || ' / ' || name else name end)`
  )
  computedName?: string

  @Property({ hidden: true })
  createdAt = new Date()

  @Property({ hidden: true, onUpdate: () => new Date() })
  updatedAt = new Date()
}
