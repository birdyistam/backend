import { UpdatePostDto } from '../../domain/dto/update-post.dto';

export class UpdatePostCommand {
  constructor(
    public readonly updatePostDto: UpdatePostDto,
    public readonly postId: string,
  ) {}
}
