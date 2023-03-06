import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../commands/delete-user.command';
import { UserRepository } from '../../infrastructure/user.repository';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private userRepository: UserRepository) {}

  async execute(command: DeleteUserCommand) {
    return await this.userRepository.deleteOne(command.username);
  }
}
