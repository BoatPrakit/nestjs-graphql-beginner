import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @Field((type) => String)
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Field((type) => String)
  @Column()
  username: string;

  @Field((type) => String, { nullable: true })
  @Column()
  password?: string;
}
