import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { PostDeletedEvent } from 'src/post/domain/event/post-deleted.event';

@EventsHandler(PostDeletedEvent)
export class PostDeletedHandler implements IEventHandler<PostDeletedEvent> {
  handle(event: PostDeletedEvent) {
    Logger.log(event, PostDeletedEvent.name);
  }
}
