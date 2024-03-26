import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { em } from '#services/database_service'
import { errors } from '@adonisjs/auth'

export default class AuthController {
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    if (!email || !password) {
      throw new errors.E_INVALID_CREDENTIALS('Invalid credentials')
    }
    const user = await em.findOne(User, {
      email,
    })
    if (!user) {
      throw new errors.E_INVALID_CREDENTIALS('Invalid credentials')
    }
    const hasValidPassword = await user.verifyPassword(password)

    if (!hasValidPassword) {
      throw new errors.E_INVALID_CREDENTIALS('Invalid credentials')
    }

    await auth.use('web').login(user)
    response.ok({ success: true, user })
  }

  async me({ auth, response }: HttpContext) {
    try {
      await auth.authenticate()
      response.json({ success: true, user: auth.user })
    } catch (error) {
      response.json({ success: false })
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.ok({ success: true })
  }
}
