import * as express from 'express'
import { envload } from './utils/env'
import api from './api'

envload()
const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/api', api)

app.listen(3000)
