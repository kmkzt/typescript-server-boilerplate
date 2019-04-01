import * as http from 'http'
import { join } from 'path'
import * as express from 'express'
import * as session from 'express-session'

import * as bodyParser from 'body-parser'
import * as socket from 'socket.io'
import { envload } from './utils/env'
import api from './api'
// import graphql from './graphql'
import auth, { secret } from './auth'

envload()
// express
const app = express()
const port = process.env.PORT || 5000 // heroku

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
app.use('/chat', express.static(join(root, 'chat')))
// app.use('/graphql', graphql)
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

// WebSocket
const server = http.createServer(app)
const io = socket(server)
const chat = io.of('/chat')
chat.on('connection', socket => {
  socket.on('message', data => {
    const room = data.room
    socket.join(room)
    chat.to(room).emit('message', {
      ...data,
      createdAt: new Date().toDateString()
    })
  })
  socket.on('access', data => {
    const room = data.room
    socket.join(room)
    chat.to(room).emit('access', {
      ...data,
      createdAt: new Date().toDateString()
    })
  })
})
server.listen(port)
