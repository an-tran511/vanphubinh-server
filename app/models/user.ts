import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  type EventArgs,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql'
import BaseEntity from '#models/base_entity'
import hash from '@adonisjs/core/services/hash'

@Entity()
export default class User extends BaseEntity {
  @PrimaryKey({ type: 'text', unique: true })
  email!: string

  @Property({ type: 'text', hidden: true })
  password!: string

  @Property({ type: 'text' })
  name!: string

  @Property({ hidden: true })
  createdAt = new Date()

  @Property({ hidden: true, onUpdate: () => new Date() })
  updatedAt = new Date()

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword(args: EventArgs<User>) {
    // hash only if the password was changed
    const password = args.changeSet?.payload.password

    if (password) {
      this.password = await hash.make(password)
    }
  }

  async verifyPassword(password: string) {
    return hash.verify(this.password, password)
  }
}
