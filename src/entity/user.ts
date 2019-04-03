import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne
} from 'typeorm'

@Entity('users')
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
