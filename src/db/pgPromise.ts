import * as pgPromise from 'pg-promise'

const user = process.env.POSTGRES_USER || 'user'
const host = 'localhost'
const database = process.env.POSTGRES_DB || 'database'
const password = process.env.POSTGRES_PASSWORD || 'pass'
const port = 5555

// HEROKU ENV -> https://devcenter.heroku.com/articles/node-best-practices#be-environmentally-aware
const connectPath =
  process.env.DATABASE_URL ||
  `postgres://${user}:${password}@${host}:${port}/${database}`

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

// example code ---
//
// const res = await query(
//   'SELECT id FROM ${table:name} WHERE email=${email:csv} AND password=${password:csv}',
//   { table: 'auth', email, password }
// )
//
// :::
//
// await query(
//   "INSERT INTO users (id, username, email) VALUES (3, 'dammyname', 'email@email')"
// )
//
// :::
//
// const data = {
//   id: Math.floor(Math.random() * 10000),
//   email: 'aaa@aaa',
//   password: 'aaa'
// }
// await query(
//   'INSERT INTO ${table:name} (${data:name}) VALUES (${data:csv})',
//   {
//     table: 'auth',
//     data
//   }
// )
