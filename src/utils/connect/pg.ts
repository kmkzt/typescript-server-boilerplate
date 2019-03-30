import * as pgPromise from 'pg-promise'
const user = process.env.POSTGRES_USER || 'user'
const host = 'localhost'
const database = process.env.POSTGRES_DB || 'database'
const password = process.env.POSTGRES_PASSWORD || 'pass'
const port = 5555

const connectPath = `postgres://${user}:${password}@${host}:${port}/${database}`

// pg-promise
const db = pgPromise(/*options*/)(connectPath)
export const query = async (text: string, value?: any) => {
  try {
    // console.log('connect:' + connectPath)
    const result = await db.query(text, value)
    return result
  } catch (err) {
    console.log('ERROR:', err)
    throw err
  }
}
