import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUserQuery } from '../queries/get-all-user.query';
import { UserRepository } from '../../infrastructure/user.repository';

@QueryHandler(GetAllUserQuery)
export class GetAllUserHandler implements ICommandHandler<GetAllUserQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    return await this.userRepository.findAll();
  }
}
