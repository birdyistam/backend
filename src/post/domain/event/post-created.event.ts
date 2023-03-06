import { IEvent } from '@nestjs/cqrs';

export class PostCreatedEvent implements IEvent {
  constructor(readonly postId: string) {}
}
