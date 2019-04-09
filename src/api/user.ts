import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { secret, authRequired } from '../auth'
import { User } from '../entity/user'
import { Auth } from '../entity/auth'
import { validate } from 'class-validator'
import { update as updateUser } from '../model/user'
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
    const user = await User.findOne({ id: req.params.id })
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
    const userResult: string | User = await updateUser({
      id: req.params.id,
      ...req.body
    })
    if (typeof userResult === 'string') {
      res.status(400).send({ message: userResult })
      return
    }

    res.status(200).send(userResult)
  } catch (err) {
    res.status(400).send({ message: err })
  }
})
export default user
