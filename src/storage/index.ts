import * as AWS from 'aws-sdk'
import { resolve } from 'path'

const configPath: string =
  process.env.AWS_CREDENTIAL_PATH || resolve(__dirname, '../../minio.json')
AWS.config.loadFromPath(configPath)
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
  sslEnabled: process.env.NODE_ENV === 'production'
})
const s3config =
  process.env.NODE_ENV === 'development'
    ? { endpoint: 'http://localhost:9000' }
    : undefined
const s3 = new AWS.S3(s3config)

export const getListBuckets = () => {
  return new Promise((resolve, reject) =>
    s3.listBuckets((err, res) => {
      if (err) reject(err)
      if (!res) resolve({ message: 'no bucket' })
      return resolve(res)
    })
  )
}
