import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { IsEmail } from 'class-validator'
import { User } from './user'

@Entity('auth')
export class Auth extends BaseEntity {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  @IsEmail()
  @Index({ unique: true })
  email!: string

  @Column()
  password!: string

  @OneToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user?: User
}
