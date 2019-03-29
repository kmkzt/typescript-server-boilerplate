import * as dotenv from 'dotenv'
import { resolve } from 'path'

export const envload = () => {
  const envfile = `${process.env.NODE_ENV}.env`
  const envpath = resolve(__dirname, '../../../', envfile)
  console.log('load:' + envpath)
  dotenv.config({ path: envpath })
}
