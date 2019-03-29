import * as dotenv from 'dotenv'
import { resolve } from 'path'

const envfile = `${process.env.NODE_ENV}.env`
console.log('load:' + envfile)
dotenv.config({ path: resolve(__dirname, envfile) })
