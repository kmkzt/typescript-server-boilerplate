import * as express from 'express'
import user from './user'
import picture from './picture'
const api = express.Router()
api.use(user)
api.use(picture)
export default api
