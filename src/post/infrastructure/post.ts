import { AggregateRoot } from '@nestjs/cqrs';
import { PostCreatedEvent } from '../domain/event/post-created.event';
import { PostDeletedEvent } from '../domain/event/post-deleted.event';
import { PostUpdatedEvent } from '../domain/event/post-updated.event';
//import { UserUpdatedEvent } from './event/user-updated.event';
//import { UserDeletedEvent } from './event/user-deleted.event';
//import { UserWelcomedEvent } from './event/user-welcomed.event';

export type PostEssentialProperties = Readonly<
  Required<{
    postId: string;
    title: string;
    description?: string;
    content: string;
    userId: string;
  }>
>;

export type PostOptionalProperties = Readonly<
  Partial<{
    createdAt: Date;
    completedAt: Date;
    deletedAt: Date | null;
  }>
>;

export type PostProperties = PostEssentialProperties &
  Required<PostOptionalProperties>;

export interface PostDomain {
  createPost: () => void;
  updatePost: (content: string) => void;
  commit: () => void;
  deletePost: (postId: string) => void;
}

export class PostImplement extends AggregateRoot implements PostDomain {
  private readonly postId: string;
  private title: string;
  private description?: string;
  private content: string;
  private readonly userid: string;
  private readonly createdAt: Date;
  private completedAt: Date;
  private deletedAt: Date | null;

  constructor(properties: PostProperties) {
    super();
    Object.assign(this, properties);
  }

  createPost() {
    this.apply(new PostCreatedEvent(this.postId));
  }
  updatePost(content: string): void {
    this.content = content;
    this.completedAt = new Date();
    this.apply(new PostUpdatedEvent(this.postId, this.content));
  }
  deletePost(): void {
    this.completedAt = new Date();
    this.apply(new PostDeletedEvent(this.postId));
  }
}
