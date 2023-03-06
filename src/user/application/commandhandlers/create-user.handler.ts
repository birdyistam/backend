import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '../../infrastructure/user.repository';
import { UserFactory } from '../../domain/user-factory';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, void>
{
  // constructor(
  //   private userRepository: UserRepository,
  //   private readonly userFactory: UserFactory,
  // ) {}
  @Inject() private readonly userRepository: UserRepository;
  @Inject() private readonly userFactory: UserFactory;

  async execute(command: CreateUserCommand) {
    // command.createUserDto.createdAt = new Date();
    // return await this.userRepository.create(command.createUserDto);
    const user = this.userFactory.create({ ...command.createUserDto });
    console.log(user);
    user.createUser();
    await this.userRepository.create(user);
    user.commit();
  }
}
