import { CreatePostDto } from '../../domain/dto/create-post.dto';

export class CreatePostCommand {
  constructor(public readonly createPostDto: CreatePostDto) {}
}
