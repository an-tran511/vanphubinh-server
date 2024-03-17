import User from '#models/user'
import app from '@adonisjs/core/services/app'
import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/postgresql'

let db: MikroORM
let em: EntityManager
let userRepository: EntityRepository<User>

app.booted(async () => {
  db = await app.container.make('mikro:db')
  em = db.em.fork()
  userRepository = em.getRepository(User)
})

export { db, em, userRepository }
