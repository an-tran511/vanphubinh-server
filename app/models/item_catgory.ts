import {
  Collection,
  Entity,
  Formula,
  ManyToOne,
  OneToMany,
  type Opt,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql'
import BaseEntity from '#models/base_entity'
import { nanoid } from '#utils/id_generator'

@Entity()
export default class ItemCategory extends BaseEntity {
  @PrimaryKey({ type: 'text', primary: true })
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
  path!: Opt<string>

  @Formula(
    (alias) =>
      `(case when ${alias}."parent_item_category_id" is not null then ${alias}.path || ' / ' || ${alias}.name else ${alias}.name end)`
  )
  computedName?: Opt<string>
}
