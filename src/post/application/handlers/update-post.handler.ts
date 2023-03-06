import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostCommand } from '../commands/update-post.command';
import { PostRepository } from '../../infrastructure/post.repository';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(private postRepository: PostRepository) {}

  async execute(command: UpdatePostCommand) {
    return await this.postRepository.findByIdAndUpdate(
      command.postId,
      command.updatePostDto,
    );
  }
}
