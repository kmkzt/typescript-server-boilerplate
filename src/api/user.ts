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
      res.status(200).send(user)
      return
    }
    res.status(200).send({
      message: 'no found user'
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

user.get('/users', authRequired, async (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  try {
    res.status(200).send(await User.find())
  } catch (err) {
    res.status(500).send(err)
  }
})

user.post('/users/:id', authRequired, async (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  try {
    const id = req.params.id
    const data = req.body
    const user = await User.findOne({ id })
    if (!data || typeof data !== 'object') {
      res.status(400).send({ message: 'request error' })
      return
    }
    if (!user) {
      res.status(400).send({ message: 'not found user' })
      return
    }
    const updateKey: Array<keyof User> = [
      'username',
      'color',
      'profile',
      'picture'
    ]
    const updateData: Partial<User> = updateKey.reduce(
      (upd: Partial<User>, key: keyof User) =>
        data.includes(key)
          ? {
              [key]: data[key],
              ...upd
            }
          : upd,
      {}
    )

    const updateRes = await User.update(user, updateData)
    res.status(200).send(updateRes)
  } catch (err) {
    res.status(400).send({ message: err })
  }
})
export default user
