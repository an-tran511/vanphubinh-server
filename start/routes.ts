/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const UomController = () => import('#controllers/uom_controller')
const ItemCategoryController = () => import('#controllers/item_category_controller')
const PartnerController = () => import('#controllers/partner_controller')
const PackagingController = () => import('#controllers/packaging_controller')
const WarehouseController = () => import('#controllers/warehouse_controller')
const LocationController = () => import('#controllers/location_controller')
const PurchaseMouldOrderController = () => import('#controllers/purchase_mould_order_controller')
const MouldController = () => import('#controllers/mould_controller')

router.get('/', async () => {
  return {
    hello: new Date().toString(),
  }
})

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.get('/me', [AuthController, 'me'])
    router.post('/logout', [AuthController, 'logout'])
  })
  .prefix('auth')
router.resource('uoms', UomController).apiOnly()
router.resource('item-categories', ItemCategoryController).apiOnly()
router.get('/partners/mould-makers', [PartnerController, 'mouldMakers'])
router.resource('partners', PartnerController).apiOnly()
router.resource('packagings', PackagingController).apiOnly()
router.resource('warehouses', WarehouseController).apiOnly()
router.resource('locations', LocationController).apiOnly()
router.resource('purchase-mould-orders', PurchaseMouldOrderController).apiOnly()
router.resource('moulds', MouldController).apiOnly()
router.post('/moulds/bulk', [MouldController, 'storeMany'])
router.post('/purchase-mould-orders/bulk', [PurchaseMouldOrderController, 'storeMany'])
