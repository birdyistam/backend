import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { PostUpdatedEvent } from 'src/post/domain/event/post-updated.event';

@EventsHandler(PostUpdatedEvent)
export class PostUpdatedHandler implements IEventHandler<PostUpdatedEvent> {
  handle(event: PostUpdatedEvent) {
    Logger.log(event, PostUpdatedEvent.name); // write here
  }
}
