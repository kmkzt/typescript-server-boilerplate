import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { query } from '../utils/connect/pg'
import { secret } from '../auth'
const user = express.Router()

user.get('/me', async (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  if (!req.session) {
    res.json({
      message: 'server error.'
    })
    return
  }
  if (!req.session.token) {
    res.json({
      message: 'required authentication.'
    })
    return
  }
  try {
    const decode = jwt.verify(req.session.token, secret)
    if (typeof decode === 'string') {
      res.json({
        message: 'server error.'
      })
      return
    }
    const id = decode.hasOwnProperty('id') ? (decode as any).id : null
    if (!id) {
      res.json({
        message: 'not found user info'
      })
    }
    const param = await query(
      'SELECT * FROM ${table:name} WHERE id=${id} LIMIT 1',
      { table: 'users', id }
    )
    if (param.length === 0) {
      res.send({
        message: 'not found user info'
      })
    }
    res.send(param)
  } catch (err) {
    res.send({ message: 'failed network error.' })
  }
})
user.get('/users', async (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  if (!req.session) {
    res.json({
      message: 'server error.'
    })
    return
  }
  if (!req.session.token) {
    res.json({
      message: 'required authentication.'
    })
    return
  }
  const param = await query('SELECT * FROM ${table:name}', { table: 'users' })
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
