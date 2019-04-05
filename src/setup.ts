import * as dotenv from 'dotenv'
import { resolve } from 'path'

export const envload = () => {
  // Todo: optimize env. Don't load env in heroku.
  if (process.env.DATABASE_URL) return
  const envfile = `${process.env.NODE_ENV}.env`
  const envpath = resolve(__dirname, '../', envfile)
  console.log('load:' + envpath)
  dotenv.config({ path: envpath })
}
