import * as pgPromise from 'pg-promise'
const user = process.env.POSTGRES_USER || 'user'
const host = 'localhost'
const database = process.env.POSTGRES_DB || 'database'
const password = process.env.POSTGRES_PASSWORD || 'pass'
const port = 5555

const connectPath = `postgres://${user}:${password}@${host}:${port}/${database}`

// pg-promise
export const query = async (text: string, value?: any) => {
  try {
    console.log('connect:' + connectPath)
    const db = pgPromise(/*options*/)(connectPath)
    // const result = await db.query('SELECT $1:name FROM $2:name', ['*', 'users'])
    const result = await db.query(text, value)
    return result
  } catch (err) {
    console.log('ERROR:', err)
    throw err
  }
}

// node-postgres
// import { Pool, QueryArrayConfig, QueryArrayResult } from 'pg'
// export const query = async (
//   query: Partial<QueryArrayConfig>,
//   value?: any[]
// ): Promise<any> => {
//   try {
//     const pool = new Pool({
//       connectionString: connectPath
//     })
//     // console.log(pool)
//     const result: QueryArrayResult = await pool.query(
//       {
//         rowMode: 'array',
//         ...query
//       } as QueryArrayConfig,
//       value
//     )
//     pool.end()
//     console.log(result)
//     return result.rows
//   } catch (err) {
//     // console.log(err)
//     throw err
//   }
// }
