import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { UserProperties, UserImplement } from '../infrastructure/User';
type CreateUserOptions = Readonly<{
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}>;

export class UserFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  create(options: CreateUserOptions) {
    return this.eventPublisher.mergeObjectContext(
      new UserImplement({
        ...options,
        createdAt: new Date(),
        completedAt: new Date(),
        deletedAt: null,
      }),
    );
  }

  reconstitute(properties: UserProperties) {
    return this.eventPublisher.mergeObjectContext(
      new UserImplement(properties),
    );
  }
}
