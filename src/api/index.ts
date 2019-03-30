import * as express from 'express'
import user from './user'
const api = express.Router()
api.use(user)

export default api
