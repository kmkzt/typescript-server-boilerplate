import * as Ajv from 'ajv'
import { User } from '../entity/user'

const validate = new Ajv({ removeAdditional: true }).compile({
  $async: true,
  additionalProperties: false,
  properties: {
    id: {
      type: 'string',
      require: true
    },
    username: {
      type: 'string',
      require: false
    },
    color: {
      type: 'string',
      require: false
    },
    profile: {
      type: 'string',
      require: false
    },
    picture: {
      type: 'string',
      require: false
    }
  }
})

export const update = async (input: any): Promise<User> => {
  try {
    const data: User = await validate(input)
    if (!data) throw 'request is wrong'
    if (!data.id) throw 'user id is required.'
    const user = await User.findOne({ id: data.id })
    if (!user) throw 'not found user'
    await User.update(user, data)
    // TODO: refactor update logic
    const result = await User.findOne({ id: data.id })
    if (!result) throw 'failed update user.'
    return result
  } catch (err) {
    throw err
  }
}

export const add = async (input: any): Promise<User> => {
  try {
    const userinfo = new User()
    const data: User = await validate(input)
    if (data) {
      Object.keys(data).map((upd: string, i: number) => {
        userinfo[upd] = data[upd]
      })
    }
    const result = await User.save(userinfo)
    if (!result) throw 'failed add user.'
    return result
  } catch (err) {
    throw err
  }
}
// export default schema
