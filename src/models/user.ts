import Ajv from 'ajv'

const schema = new Ajv({ removeAdditional: true }).compile({
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
})

export default schema
