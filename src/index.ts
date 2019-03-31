import * as http from 'http'
import { join } from 'path'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as socket from 'socket.io'
import * as session from 'express-session'
import { envload } from './utils/env'
import api from './api'
import auth, { secret } from './auth'

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
// static path
const root = join(__dirname, 'public')
// routing
app.use('/api', api)
app.use('/auth', auth)

// WebSocket
app.use('/chat', express.static(join(root, 'chat')))
const server = http.createServer(app)
const io = socket(server)
io.of('/chat').on('connection', socket => {
  socket.on('message', data => {
    console.log(data)
    io.emit('message', data)
  })
  socket.on('access', data => {
    console.log(data)
    io.emit('access', data)
  })
})
server.listen(3000)

// fallback -> root
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

// app.listen(3000)
