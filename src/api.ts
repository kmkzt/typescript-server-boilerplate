import * as express from 'express'
import { connectQuery } from './utils/connect/pg'

const api = express.Router()

api.get('/users', async (req, res, next) => {
  const param = await connectQuery()
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param)
})

export default api
