import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPostQuery } from '../queries/get-all-post.query';
import { PostRepository } from '../../infrastructure/post.repository';

@QueryHandler(GetAllPostQuery)
export class GetAllPostHandler implements ICommandHandler<GetAllPostQuery> {
  constructor(private postRepository: PostRepository) {}

  async execute() {
    return await this.postRepository.findAll();
  }
}
