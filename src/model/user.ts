// import Ajv from 'ajv'
import { User } from '../entity/user'

// const schema = new Ajv({ removeAdditional: true }).compile({
//   $async: true,
//   additionalProperties: false,
//   properties: {
//     id: {
//       type: 'number'
//     },
//     username: {
//       type: 'string'
//     },
//     color: {
//       type: 'string'
//     },
//     profile: {
//       type: 'string'
//     },
//     picture: {
//       type: 'string'
//     }
//   }
// })

export const update = async (data: Partial<User>): Promise<User | string> => {
  try {
    if (!data.id) return 'user id is required.'
    const user = await User.findOne({ id: data.id })
    if (!user) return 'not found user'
    const updateKey: Array<keyof User> = [
      'username',
      'color',
      'profile',
      'picture'
    ]
    const updateData: Partial<User> = updateKey.reduce(
      (upd: Partial<User>, key: keyof User) =>
        updateKey.includes(key)
          ? {
              [key]: data[key],
              ...upd
            }
          : upd,
      {}
    )
    await User.update(user, updateData)
    // TODO: refactor update logic
    const result = await User.findOne({ id: data.id })
    if (!result) return 'failed update user.'
    return result
  } catch (err) {
    throw err
  }
}
// export default schema
