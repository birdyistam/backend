import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../commands/update-user.command';
import { UserRepository } from '../../infrastructure/user.repository';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private userRepository: UserRepository) {}

  async execute(command: UpdateUserCommand) {
    return await this.userRepository.findByIdAndUpdate(
      command.username,
      command.updateUserDto,
    );
  }
}
