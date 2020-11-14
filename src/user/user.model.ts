import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @Field(() => String)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  email: string;
}
