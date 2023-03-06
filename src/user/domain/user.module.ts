import { Module } from '@nestjs/common';
import { UserController } from '../presentation/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../infrastructure/schemas/user.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from '../application/commandhandlers/create-user.handler';
import { DeleteUserHandler } from '../application/commandhandlers/delete-user.handler';
import { GetAllUserHandler } from '../application/queryhandlers/get-all-user.handler';
import { UserRepository } from '../infrastructure/user.repository';
import { GetUserHandler } from '../application/queryhandlers/get-user-by-id.handler';
import { UpdateUserHandler } from '../application/commandhandlers/update-user.handler';
import { UserFactory } from './user-factory';
import { EventHandlers } from '../application/check-log';
import { UserCreatedHandler } from '../application/check-log/user-created.handler';

@Module({
  providers: [
    // UserService,
    CreateUserHandler,
    UserRepository,
    GetUserHandler,
    GetAllUserHandler,
    DeleteUserHandler,
    UpdateUserHandler,
    UserFactory,
    UserCreatedHandler,
    ...EventHandlers,
  ],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
  ],
})
export class UserModule {}
