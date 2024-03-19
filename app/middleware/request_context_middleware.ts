import { em } from '#services/database_service'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { RequestContext } from '@mikro-orm/postgresql'

export default class RequestContextMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    return await RequestContext.create(em, next)
  }
}
