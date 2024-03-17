import User from '#models/user'
import { userRepository } from '#services/database_service'
import { symbols } from '@adonisjs/auth'
import { SessionGuardUser, SessionUserProviderContract } from '@adonisjs/auth/types/session'

export class SessionMikroUserProvider implements SessionUserProviderContract<User> {
  declare [symbols.PROVIDER_REAL_USER]: User

  async createUserForGuard(user: User): Promise<SessionGuardUser<User>> {
    return {
      getId() {
        return user.email
      },
      getOriginal() {
        return user
      },
    }
  }

  async findById(identifier: string): Promise<SessionGuardUser<User> | null> {
    const user = await userRepository.findOne({ email: identifier })

    if (!user) {
      return null
    }

    return this.createUserForGuard(user)
  }
}
