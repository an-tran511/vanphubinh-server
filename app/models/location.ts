import {
  Collection,
  Entity,
  Formula,
  ManyToOne,
  OneToMany,
  type Opt,
  PrimaryKey,
  Property,
  Enum,
  type Rel,
} from '@mikro-orm/postgresql'
import BaseEntity from '#models/base_entity'
import { nanoid } from '#utils/id_generator'
import Warehouse from './warehouse.js'

@Entity()
export default class Location extends BaseEntity {
  @PrimaryKey({ type: 'text', primary: true })
  id: string = nanoid()

  @Property({ type: 'text' })
  name!: string

  @ManyToOne({
    entity: () => Location,
    nullable: true,
  })
  parentLocation?: Location

  @OneToMany({
    entity: () => Location,
    mappedBy: 'parentLocation',
  })
  childrenLocations = new Collection<Location>(this)

  @Property({ type: 'text' })
  path!: Opt<string>

  @Property({ type: 'boolean' })
  isScrapLocation: boolean = false

  @Property({ type: 'boolean' })
  isReturnLocation: boolean = false

  @ManyToOne('Warehouse')
  warehouse?: Rel<Warehouse>

  @Enum({ items: () => LocationTypeEnum })
  type!: 'view' | 'internal' | 'customer' | 'inventory' | 'production' | 'transit' | 'supplier'

  @Formula(
    (alias) =>
      `(case when ${alias}."parent_location_id" is not null and (
          select case when exists (
            select "name"
            from location
            where id = ${alias}."parent_location_id" and "type" = 'view'
          )
          then false
          else true end)
        then ${alias}.path || ' / ' || ${alias}.name else ${alias}.name end)`
  )
  computedName?: Opt<string>
}

export enum LocationTypeEnum {
  VIEW = 'view',
  INTERNAL = 'internal',
  CUSTOMER = 'customer',
  INVENTORY = 'inventory',
  PRODUCTION = 'production',
  TRANSIT = 'transit',
  SUPPLIER = 'supplier',
}
