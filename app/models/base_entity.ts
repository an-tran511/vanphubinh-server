import { Opt, Property } from '@mikro-orm/postgresql'

export default abstract class BaseEntity {
  @Property({ hidden: true })
  createdAt: Date & Opt = new Date()

  @Property({ onUpdate: () => new Date(), hidden: true })
  updatedAt: Date & Opt = new Date()
}
