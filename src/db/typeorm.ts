import { createConnection, ConnectionOptions } from 'typeorm'
import { Auth } from '../entities/auth'
import { User } from '../entities/user'

const isDev = process.env.NODE_ENV !== 'prodcution'
const connectDatabase = async () => {
  try {
    const user = process.env.POSTGRES_USER || 'user'
    const host = 'localhost'
    const database = process.env.POSTGRES_DB || 'database'
    const password = process.env.POSTGRES_PASSWORD || 'pass'
    const port = 5555
    // HEROKU ENV -> https://devcenter.heroku.com/articles/node-best-practices#be-environmentally-aware
    const config: ConnectionOptions = {
      type: 'postgres',
      url:
        process.env.DATABASE_URL ||
        `postgres://${user}:${password}@${host}:${port}/${database}`,
      entities: [Auth, User],
      logging: ['query', 'error'],
      synchronize: isDev
    }
    return await createConnection(config)
  } catch (err) {
    throw err
  }
}
