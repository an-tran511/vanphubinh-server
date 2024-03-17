import { OptionalProps, Property } from '@mikro-orm/postgresql'

export default abstract class BaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt'

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date()
}
