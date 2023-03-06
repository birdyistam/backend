import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { UserUpdatedEvent } from 'src/user/domain/event/user-updated.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  handle(event: UserUpdatedEvent) {
    Logger.log(event, UserUpdatedEvent.name); // write here
  }
}
