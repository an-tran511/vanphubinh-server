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

router
  .get('/', async () => {
    return {
      hello: 'world',
    }
  })
  .use(
    middleware.auth({
      guards: ['web'],
    })
  )
router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.get('/me', [AuthController, 'me'])
    router.post('/logout', [AuthController, 'logout'])
  })
  .prefix('auth')
