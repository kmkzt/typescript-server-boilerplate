import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { secret, authRequired } from '../auth'
import { User } from '../entity/user'
import { Auth } from '../entity/auth'
import { validate } from 'class-validator'
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

user.get('/users/:id', authRequired, async (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  try {
    const user = await User.findOne({
      where: { id: req.params.id }
    })
    if (!user) {
      res.send({
        message: 'no found user'
      })
      return
    }
    res.send(user)
  } catch (err) {
    res.send(err)
  }
})

user.get('/users', authRequired, async (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  try {
    res.send(await User.find())
  } catch (err) {
    res.send(err)
  }
})

user.post('/users/:id', authRequired, async (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  try {
    const data = req.body
    if (!data || typeof data !== 'object') {
      res.send({ message: 'request error' })
    }
    const updateKey: Array<keyof User> = [
      'username',
      'color',
      'profile',
      'picture'
    ]
    const user = new User()
    updateKey.map((key: keyof User) => {
      if (data.includes(key)) user[key] = data[key]
    })

    const error = await validate(user)
    if (error.length > 0) {
      res.send(error)
      return
    }
    User.save(user)
    res.send(`success add: ${JSON.stringify(data)}`)
  } catch (err) {
    res.send({ message: 'failed network error.' })
  }
})
export default user
