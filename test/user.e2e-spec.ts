import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from '../src/user/user.module';
import { User } from '../src/user/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('User (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'mongodb',
          url: 'mongodb://127.0.0.1:27017/test',
          entities: [User],
          synchronize: true,
        }),
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const user: User = {
    id: null,
    firstname: 'Yahya',
    lastname: 'Daoud',
    email: 'kittaneh@gmail.com',
  };

  const createUserQuery = `
  mutation {
    createUser(
      firstname:"Yahya",
      lastname:"Daoud",
      email:"kittaneh@gmail.com"
    ) {
      firstname,
      lastname,
      email,
    }
  }`;

  it('createItem', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createUserQuery,
      })
      .expect(({ body }) => {
        const data = body.data.createUser;
        expect(data.firstname).toBe(user.firstname);
        expect(data.lastname).toBe(user.lastname);
        expect(data.email).toBe(user.email);
      })
      .expect(200);
  });

  it('findAll', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: '{users{firstname, lastname, email, id}}',
      })
      .expect(({ body }) => {
        const data = body.data.users;
        const userResult = data[0];
        expect(data.length).toBeGreaterThan(0);
        expect(userResult.firstname).toBe(user.firstname);
        expect(userResult.lastname).toBe(user.lastname);
        expect(userResult.email).toBe(user.email);
      })
      .expect(200);
  });
});
