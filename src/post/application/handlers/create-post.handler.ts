import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../commands/create-post.command';
import { PostRepository } from '../../infrastructure/post.repository';
import { UserRepository } from 'src/user/infrastructure/user.repository';
import { Post } from '../../infrastructure/schemas/post.schema';
import { User } from 'src/user/infrastructure/schemas/user.schema';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
  ) {}
  private usertemp: User;
  async execute(command: CreatePostCommand) {
    //Query user
    const postDoc: Post = new Post();
    this.usertemp = await this.userRepository.findById(
      command.createPostDto.userId.toString(),
    );
    // async execute(command: CreatePostCommand) {
    //   //Query user
    //   const postDoc: Post = new Post();
    //   await this.userRepository
    //     .findById(command.createPostDto.userId.toString())
    //     .then((userpost) => {
    //       this.usertemp = userpost;
    //     });
    postDoc.content = command.createPostDto.content;
    postDoc.description = command.createPostDto.description;
    postDoc.title = command.createPostDto.title;
    postDoc.user = this.usertemp;
    postDoc.createdAt = new Date();
    console.log(postDoc);
    return await this.postRepository.create(postDoc);
  }
}
