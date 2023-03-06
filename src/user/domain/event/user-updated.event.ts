import { IEvent } from '@nestjs/cqrs';

export class UserUpdatedEvent implements IEvent {
  constructor(readonly username: string, readonly firstname: string) {}
}
