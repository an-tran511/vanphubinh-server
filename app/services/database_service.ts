import ItemCategory from '#models/item_catgory'
import Location from '#models/location'
import Mould from '#models/mould'
import Packaging from '#models/packaging'
import Partner from '#models/partner'
import PurchaseMouldOrder from '#models/purchase_mould_order'
import Uom from '#models/uom'
import User from '#models/user'
import Warehouse from '#models/warehouse'
import app from '@adonisjs/core/services/app'
import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/postgresql'

let db: MikroORM
let em: EntityManager
let userRepository: EntityRepository<User>
let uomRepository: EntityRepository<Uom>
let itemCategoryRepository: EntityRepository<ItemCategory>
let partnerRepository: EntityRepository<Partner>
let packagingRepository: EntityRepository<Packaging>
let warehouseRepository: EntityRepository<Warehouse>
let locationRepository: EntityRepository<Location>
let purchaseMouldOrderRepository: EntityRepository<PurchaseMouldOrder>
let mouldRepository: EntityRepository<Mould>

app.booted(async () => {
  db = await app.container.make('mikro:db')
  em = db.em
  userRepository = em.getRepository(User)
  uomRepository = em.getRepository(Uom)
  itemCategoryRepository = em.getRepository(ItemCategory)
  partnerRepository = em.getRepository(Partner)
  packagingRepository = em.getRepository(Packaging)
  warehouseRepository = em.getRepository(Warehouse)
  locationRepository = em.getRepository(Location)
  purchaseMouldOrderRepository = em.getRepository(PurchaseMouldOrder)
  mouldRepository = em.getRepository(Mould)
})

export {
  db,
  em,
  userRepository,
  uomRepository,
  itemCategoryRepository,
  partnerRepository,
  packagingRepository,
  warehouseRepository,
  locationRepository,
  purchaseMouldOrderRepository,
  mouldRepository,
}
