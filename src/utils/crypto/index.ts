import * as crypto from 'crypto'
import { String } from 'aws-sdk/clients/marketplacemetering'

const key = 'zT5YSwHZ'
const algo = 'aes-256-ctr'
const pass_encode = 'utf8'
const hash_encode = 'base64' // 'hex' | 'base64'

export const encrypt = (password: string): String => {
  const cipher = crypto.createCipher(algo, key)
  let crypted = cipher.update(password, pass_encode, hash_encode)
  crypted += cipher.final(hash_encode)
  return crypted
}

export const decrypt = (hash: string) => {
  const decipher = crypto.createDecipher(algo, key)
  let dec = decipher.update(hash, hash_encode, pass_encode)
  dec += decipher.final(pass_encode)
  return dec
}

export const hashed = (txt: string) => {
  let hash = crypto.createHmac('sha512', txt)
  hash.update(txt)
  let value = hash.digest('hex')
  return value
}
