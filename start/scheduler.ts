import scheduler from 'adonisjs-scheduler/services/main'
import { db } from '#services/database_service'

scheduler.command('inspire').everyFiveSeconds()

scheduler
  .call(async () => {
    const d = new Date()
    console.log(process.env.TZ)
    console.log(d)
    // await db.em.fork().execute(`ALTER SEQUENCE partner_seq RESTART WITH 1;`)
  })
  .everyFiveSeconds()
