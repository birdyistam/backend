import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../domain/event/user-created.event';
import { UserDeletedEvent } from '../domain/event/user-deleted.event';
import { UserUpdatedEvent } from '../domain/event/user-updated.event';
//import { UserUpdatedEvent } from './event/user-updated.event';
//import { UserDeletedEvent } from './event/user-deleted.event';
//import { UserWelcomedEvent } from './event/user-welcomed.event';

export type UserEssentialProperties = Readonly<
  Required<{
    username: string;
    firstname: string;
    lastname: string;
    email: string;
  }>
>;

export type UserOptionalProperties = Readonly<
  Partial<{
    createdAt: Date;
    completedAt: Date;
    deletedAt: Date | null;
  }>
>;

export type UserProperties = UserEssentialProperties &
  Required<UserOptionalProperties>;

export interface UserDomain {
  createUser: () => void;
  updateUser: (firstname: string) => void;
  commit: () => void;
  deleteUser: (username: string) => void;
}

export class UserImplement extends AggregateRoot implements UserDomain {
  private readonly username: string;
  private firstname: string;
  private readonly lastname: string;
  private readonly email: string;
  private readonly createdAt: Date;
  private completedAt: Date;
  private deletedAt: Date | null;

  constructor(properties: UserProperties) {
    super();
    Object.assign(this, properties);
  }

  createUser(): void {
    this.apply(new UserCreatedEvent(this.email));
  }

  updateUser(firstname: string): void {
    this.firstname = firstname;
    this.completedAt = new Date();
    this.apply(new UserUpdatedEvent(this.username, this.firstname));
  }

  deleteUser(): void {
    this.completedAt = new Date();
    this.apply(new UserDeletedEvent(this.username));
  }
}
