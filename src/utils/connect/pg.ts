import * as pgConnect from 'pg-promise'

const username = process.env.POSTGRES_USER || 'user'
const password = process.env.POSTGRES_PASSWORD || 'pass'
const database = process.env.POSTGRES_DB || 'database'
const host = '127.0.0.1'
const port = '3306'

export const connectQuery = async () => {
  try {
    const connectPath = `postgres://${username}:${password}@${host}:${port}/${database}`
    console.log('connect:' + connectPath)
    const db = await pgConnect(/*options*/)(connectPath)
    // const result = await db.query('SELECT $1:name FROM $2:name', ['*', 'users'])
    const result = await db.query('SELECT * FROM users')
    return result
  } catch (err) {
    console.log('ERROR:', err)
  }
}
