import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { query } from '../db/pgPromise'
import { secret, authRequired } from '../auth'
import { User } from '../entity/user'
import { Auth } from '../entity/auth'
const user = express.Router()

user.get('/me', authRequired, async (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  try {
    const decode = jwt.verify((req.session as any).token, secret) as any
    if (typeof decode === 'string') {
      res.json({
        message: 'server error.'
      })
      return
    }
    console.log(decode)
    if (!decode.id) {
      res.json({
        message: 'not found user id'
      })
    }

    const param = await Auth.findOne({
      relations: ['user'],
      where: { id: decode.id }
    })

    if (!param) {
      res.send({
        message: 'not found user info'
      })
      return
    }
    res.send(param)
  } catch (err) {
    res.send({ message: 'failed network error.' })
  }
})
user.get('/users', authRequired, async (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  const param = await query('SELECT * FROM ${table:name}', { table: 'users' })
  res.send(param)
})

user.post('/users', authRequired, async (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
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
    res.send({ message: 'failed network error.' })
  }
})
export default user
