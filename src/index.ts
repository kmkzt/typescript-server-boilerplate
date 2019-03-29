import * as express from 'express'
import { envload } from './utils/env'
import api from './api'
import { join } from 'path'

envload()
const app = express()

app.use('/api', api)

// fallback -> root
const root = join(__dirname, '../public')
console.log(root)
app.use(
  '*',
  express.static(root, {
    dotfiles: 'ignore',
    // etag: false,
    // extensions: ['htm', 'html'],
    // index: false,
    // maxAge: '1d',
    // redirect: false,
    setHeaders: function(res, path, stat) {
      res.set('x-timestamp', String(Date.now()))
    }
  })
)

app.listen(3000)
