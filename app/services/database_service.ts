import ItemCategory from '#models/item_catgory'
import Uom from '#models/uom'
import User from '#models/user'
import app from '@adonisjs/core/services/app'
import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/postgresql'

let db: MikroORM
let em: EntityManager
let userRepository: EntityRepository<User>
let uomRepository: EntityRepository<Uom>
let itemCategoryRepository: EntityRepository<ItemCategory>

app.booted(async () => {
  db = await app.container.make('mikro:db')
  em = db.em.fork()
  userRepository = em.getRepository(User)
  uomRepository = em.getRepository(Uom)
  itemCategoryRepository = em.getRepository(ItemCategory)
})

export { db, em, userRepository, uomRepository, itemCategoryRepository }
