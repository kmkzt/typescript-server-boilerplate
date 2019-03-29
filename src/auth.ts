import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { query } from './utils/connect/pg'
const auth = express.Router()

export const secret = 'secret'

const authUser = async (email: string, password: string): Promise<string> => {
  try {
    const id = await query(
      'SELECT id FROM ${table:name} WHERE email=${email:csv} AND password=${password:csv}',
      { table: 'auth', email, password }
    )
    return id
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
    const userId = await authUser(email, password)
    if (userId) {
      const token = jwt.sign({ userId }, secret, { expiresIn: '25h' })
      req.session.token = token
      res.send({ token })
    } else {
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
  req.session.token = null
  res.send({ message: 'signout success.' })
})

auth.post('/register', async (req, res, next) => {
  res.contentType('application/json')
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
        table: 'auth',
        data
      }
    )
    res.send({ data })
  } catch (err) {
    res.send({ err })
  }
})

export default auth
