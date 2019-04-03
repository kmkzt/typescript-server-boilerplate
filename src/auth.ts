// import fs from 'fs'
import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { Auth } from './entity/auth'

const auth = express.Router()

// TODO
// export const secret = fs.readFileSync('public.pem');
export const secret = 'secret'

const authUser = async (
  email: string,
  password: string
): Promise<any | null> => {
  try {
    const result = await Auth.find({
      select: ['id', 'user'],
      where: { email, password }
    })
    return result && result.length > 0 ? result[0] : null
  } catch (err) {
    throw err
  }
}

auth.post('/token', async (req, res) => {
  res.contentType('application/json')
  try {
    if (!req.session) {
      res.send({ error: 'server error' })
      return
    }

    const { email, password } = req.body
    if (!email && !password) {
      res.send({ error: 'rquest errror' })
      return
    }
    const userinfo = await authUser(email, password)
    if (userinfo) {
      const token = jwt.sign(userinfo, secret, { expiresIn: '25h' })
      req.session.token = token
      res.send({ token })
    } else {
      req.session.token = null
      res.send({ error: 'Unable to authenticate!' })
    }
  } catch (err) {
    res.send({ error: 'server error' })
  }
})

auth.get('/logout', (req, res) => {
  res.contentType('application/json')
  if (!req.session) {
    res.send({ error: 'server error' })
    return
  }
  if (req.session.token) {
    req.session.token = null
    res.send({ message: 'signout success.' })
  } else {
    res.send({ message: 'not logged in' })
  }
})

auth.post('/register', async (req, res, next) => {
  res.contentType('application/json')
  try {
    const { email, password } = req.body
    const duplicate = await Auth.find({
      select: ['email'],
      where: {
        email
      }
    })
    if (duplicate.length > 0) {
      res.send({ error: 'Duplicate email' })
      return
    }
    const data = new Auth()
    data.email = email
    data.password = password
    await Auth.save(data)
    res.send(data)
  } catch (err) {
    res.send({ err })
  }
})

export const authRequired: express.RequestHandler = (req, res, next) => {
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
  next()
}

export default auth
