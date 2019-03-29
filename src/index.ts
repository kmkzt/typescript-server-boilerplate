import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import * as jwt from 'jsonwebtoken'
import { envload } from './utils/env'
import api from './api'
import auth, { secret } from './auth'
import { join } from 'path'

envload()
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// express-session
auth.use(
  session({
    secret, // cookie hash
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // https
      maxAge: 1000 * 60 * 60
    }
  })
)

app.use('/api', api)
app.use('/auth', auth)

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
