import * as express from 'express'
import { query } from './utils/connect/pg'

const api = express.Router()

api.get('/users', async (req, res, next) => {
  const param = await query('SELECT * FROM ${table:name}', { table: 'users' })
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param)
})

api.post('/users', async (req, res, next) => {
  // console.log(res)
  console.log(req.body)
})
export default api
