import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../queries/get-user-by-id.query';
import { UserRepository } from '../../infrastructure/user.repository';

@QueryHandler(GetUserByIdQuery)
export class GetUserHandler implements ICommandHandler<GetUserByIdQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute(command: GetUserByIdQuery) {
    return await this.userRepository.findById(command.userId);
  }
}
