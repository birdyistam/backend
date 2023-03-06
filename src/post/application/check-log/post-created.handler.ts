import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { PostCreatedEvent } from 'src/post/domain/event/post-created.event';

@EventsHandler(PostCreatedEvent)
export class PostCreatedHandler implements IEventHandler<PostCreatedEvent> {
  handle(event: PostCreatedEvent) {
    console.log(event);
    Logger.log(JSON.stringify(event), 'PostCreatedEvent.name');
  }
}
