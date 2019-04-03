const dotenv = require('dotenv')
const isDevelop = process.env.NODE_ENV !== 'production'
dotenv.config({ path: `${process.env.NODE_ENV}.env` })

const user = process.env.POSTGRES_USER || 'user'
const host = isDevelop ? 'localhost' : ''
const database = process.env.POSTGRES_DB || 'database'
const password = process.env.POSTGRES_PASSWORD || 'pass'
const port = 5555

module.exports = {
  type: 'postgres',
  host,
  port,
  username: user,
  password,
  database,
  synchronize: isDevelop, // always database migrations
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['db/typeorm/migrations/**/*.ts'],
  subscribers: ['db/typeorm/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'db/typeorm/migrations',
    subscribersDir: 'db/typeorm/subscribers'
  }
}
