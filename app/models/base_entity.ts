import { OptionalProps, Property } from '@mikro-orm/postgresql'

export default abstract class BaseEntity<
  Entity extends object,
  Optional extends keyof Entity = never,
> {
  [OptionalProps]?: 'createdAt' | 'updatedAt' | Optional

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date()
}
