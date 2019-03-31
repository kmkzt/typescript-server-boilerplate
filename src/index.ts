import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as socket from 'socket.io'
import * as session from 'express-session'
import { envload } from './utils/env'
import api from './api'
import auth, { secret } from './auth'
import { join } from 'path'

envload()
// express
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// express-session
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // https
      maxAge: 1000 * 60 * 60
    }
  })
)

// routing
app.use('/api', api)
app.use('/auth', auth)

// fallback -> root
const root = join(__dirname, 'public')
app.use(
  '*',
  express.static(root, {
    dotfiles: 'ignore',
    // etag: false,
    extensions: ['htm', 'html']
    // maxAge: '1d',
    // redirect: false,
    // setHeaders: function(res, path, stat) {
    //   res.set('x-timestamp', String(Date.now()))
    // }
  })
)

// WebSocket
const server = require('http').createServer(app)
const io = socket(server)
io.on('connection', () => {})
server.listen(3000)

// app.listen(3000)
