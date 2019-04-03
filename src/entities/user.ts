import Ajv from 'ajv'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne
} from 'typeorm'

@Entity()
export class User extends BaseEntity {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  username!: string

  @Column()
  color?: string

  @Column()
  profile?: string

  @Column()
  picture?: string
}

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
    color: {
      type: 'string'
    },
    profile: {
      type: 'string'
    },
    picture: {
      type: 'string'
    }
  }
})

export default schema
