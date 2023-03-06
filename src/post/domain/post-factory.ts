import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { PostImplement, PostProperties } from '../infrastructure/post';
type CreatePostOptions = Readonly<{
  postId: string;
  title: string;
  description: string;
  content: string;
  userId: string;
}>;

export class PostFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  create(options: CreatePostOptions) {
    return this.eventPublisher.mergeObjectContext(
      new PostImplement({
        ...options,
        createdAt: new Date(),
        completedAt: new Date(),
        deletedAt: null,
      }),
    );
  }

  reconstitute(properties: PostProperties) {
    return this.eventPublisher.mergeObjectContext(
      new PostImplement(properties),
    );
  }
}
