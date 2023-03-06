import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from '../commands/delete-post.command';
import { PostRepository } from '../../infrastructure/post.repository';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(private postRepository: PostRepository) {}

  async execute(command: DeletePostCommand) {
    return await this.postRepository.deleteOne(command.postId);
  }
}
