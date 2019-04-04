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

  @Column({ nullable: true })
  username?: string

  @Column({ nullable: true })
  color?: string

  @Column({ nullable: true })
  profile?: string

  @Column({ nullable: true })
  picture?: string
}
