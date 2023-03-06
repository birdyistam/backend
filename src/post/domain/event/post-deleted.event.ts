import { IEvent } from '@nestjs/cqrs';

export class PostDeletedEvent implements IEvent {
  constructor(readonly postId: string) {}
}
