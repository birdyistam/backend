import { PostCreatedHandler } from './post-created.handler';
import { PostDeletedHandler } from './post-deleted.handler';
import { PostUpdatedHandler } from './post-updated.handler';

export const EventHandlers = [
  PostCreatedHandler,
  PostUpdatedHandler,
  PostDeletedHandler,
];
