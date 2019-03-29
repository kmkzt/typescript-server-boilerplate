import * as express from 'express'
import './utils/env'

const app = express()

app.get('/', function(req, res) {
  res.send('hello world')
})

app.listen(3000)
