import * as express from 'express'
import { getListBuckets } from '../storage'
const picture = express.Router()

picture.get('/bucket', async (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  const result = await getListBuckets()
  res.send(result)
})

export default picture
