import * as pgConnect from 'pg-promise'

const username = process.env.POSTGRES_USER || 'user'
const password = process.env.POSTGRES_PASSWORD || 'pass'
const database = process.env.POSTGRES_DB || 'database'
const host = '127.0.0.1'
const port = '3306'
export const connectPg = async () => {
  try {
    const db = pgConnect(/*options*/)(
      `postgres://${username}:${password}@${host}:${port}/${database}`
    )
    const data = await db.one('SELECT $1 AS value', 123)
    console.log('DATA:', data.value)
  } catch (err) {
    console.log('ERROR:', err)
  }
}
