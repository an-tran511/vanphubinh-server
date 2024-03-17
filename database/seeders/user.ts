import type { EntityManager } from '@mikro-orm/postgresql'
import { Seeder } from '@mikro-orm/seeder'
import User from '#models/user'

export default class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(User, {
      email: 'an.tran@vanphubinh.vn',
      name: 'Kiến An',
      password: '123456',
    })
  }
}
