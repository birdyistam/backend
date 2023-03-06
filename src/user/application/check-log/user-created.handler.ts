import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from 'src/user/domain/event/user-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent) {
    console.log(event);
    Logger.log(JSON.stringify(event), UserCreatedEvent.name);
  }
}
