import { BasePostDto } from './base-post.dto';

export class UpdatePostDto extends BasePostDto {
  title: string;
  description: string;
  content: string;
  userId: string;
  completedAt: Date;
}
