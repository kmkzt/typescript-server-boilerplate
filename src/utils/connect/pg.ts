import { Pool, QueryArrayConfig } from 'pg'

const user = process.env.POSTGRES_USER || 'user'
const host = '127.0.0.1'
const database = process.env.POSTGRES_DB || 'database'
const password = process.env.POSTGRES_PASSWORD || 'pass'
const port = 3306

const connectPath = `postgres://${user}:${password}@${host}:${port}/${database}`

const pool = new Pool({
  connectionString: connectPath
})
export const query = (query: Partial<QueryArrayConfig>, value?: any[]) =>
  pool.query(
    {
      rowMode: 'array',
      ...query
    } as QueryArrayConfig,
    value
  )

// pg-promise
// export const connectQuery = async () => {
//   try {
//     console.log('connect:' + connectPath)
//     const db = pgConnect(/*options*/)(connectPath)
//     // const result = await db.query('SELECT $1:name FROM $2:name', ['*', 'users'])
//     const result = await db.query('SELECT * FROM users')
//     return result
//   } catch (err) {
//     console.log('ERROR:', err)
//   }
// }
