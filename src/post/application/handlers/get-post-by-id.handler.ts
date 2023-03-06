import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostByIdQuery } from '../queries/get-post-by-id.query';
import { PostRepository } from '../../infrastructure/post.repository';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdHandler implements ICommandHandler<GetPostByIdQuery> {
  constructor(private postRepository: PostRepository) {}

  async execute(command: GetPostByIdQuery) {
    return await this.postRepository.findById(command.postId);
  }
}
