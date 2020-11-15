import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from './user.model';

const findMock = jest.fn(() => {
  return ['1'];
});

const countMock = jest.fn(() => {
  return 1;
});

const MockRepository = jest.fn().mockImplementation(() => {
  return {
    find: findMock,
    count: countMock,
  };
});

const mockRepository = new MockRepository();

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return for findAll.length===count', async () => {
    expect((await service.findAll()).length).toEqual(await service.countAll());
  });
});
