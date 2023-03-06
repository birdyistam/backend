import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { UserDeletedEvent } from 'src/user/domain/event/user-deleted.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
  handle(event: UserDeletedEvent) {
    Logger.log(event, UserDeletedEvent.name);
  }
}
