import Ajv from 'ajv'

const ajv = new Ajv({ removeAdditional: true })

const schema = {
  $async: true,
  additionalProperties: false,
  properties: {
    id: {
      type: 'number'
    },
    username: {
      type: 'string'
    },
    email: {
      type: 'string'
    }
  }
}

const validate = ajv.compile(schema)
export default validate
