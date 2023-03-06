import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateUserCommand } from '../commands/create-user.command';
import { CreateUserHandler } from '../commandhandlers/create-user.handler';
import { UserFactory } from '../../domain/user-factory';
import { UserRepository } from '../../infrastructure/user.repository';

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler;
  let repository: UserRepository;
  let factory: UserFactory;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: UserRepository,
      useValue: {},
    };
    const factoryProvider: Provider = {
      provide: UserFactory,
      useValue: {},
    };

    const providers: Provider[] = [
      CreateUserHandler,
      repoProvider,
      factoryProvider,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();
    handler = testModule.get(CreateUserHandler);
    repository = testModule.get(UserRepository);
    factory = testModule.get(UserFactory);
  });

  describe('execute', () => {
    it('should execute CreateUserCommand', async () => {
      const user = { createUser: jest.fn(), commit: jest.fn() };

      factory.create = jest.fn().mockReturnValue(user);
      repository.create = jest.fn().mockResolvedValue('');
      const command = new CreateUserCommand({
        username: 'tamtt46',
        firstname: 'tam',
        lastname: 'to',
        email: 'tamtt46@fpt.com.vn',
      });

      await expect(handler.execute(command)).resolves.toEqual(undefined);
      expect(user.createUser).toBeCalledTimes(1);
      expect(repository.create).toBeCalledTimes(1);
      expect(repository.create).toBeCalledWith(user);
      expect(user.commit).toBeCalledTimes(1);
    });
  });
});
