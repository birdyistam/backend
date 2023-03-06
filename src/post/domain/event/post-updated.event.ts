import { IEvent } from '@nestjs/cqrs';

export class PostUpdatedEvent implements IEvent {
  constructor(readonly title: string, readonly content: string) {}
}
