import * as express from 'express'
import { query } from '../utils/connect/pg'
const user = express.Router()

user.get('/users', async (req, res, next) => {
  const param = await query('SELECT * FROM ${table:name}', { table: 'users' })
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param)
})

user.post('/users', async (req, res, next) => {
  try {
    const data = {
      id: Math.floor(Math.random() * 10000),
      ...req.body
    }
    // await query(
    //   "INSERT INTO users (id, username, email) VALUES (3, 'dammyname', 'email@email')"
    // )
    await query(
      'INSERT INTO ${table:name} (${data:name}) VALUES (${data:csv})',
      {
        table: 'users',
        data
      }
    )
    res.send(`success add: ${JSON.stringify(data)}`)
  } catch (err) {
    // console.log(err)
    res.redirect('/')
  }
})
export default user
