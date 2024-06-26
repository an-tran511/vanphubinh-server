import { Opt, Property } from '@mikro-orm/postgresql'

export default abstract class BaseEntity {
  @Property()
  createdAt: Date & Opt = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date()
}
