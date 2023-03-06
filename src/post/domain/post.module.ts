import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from '../presentation/post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../infrastructure/schemas/post.schema';
import { PostRepository } from '../infrastructure/post.repository';
import { User, UserSchema } from 'src/user/infrastructure/schemas/user.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePostHandler } from '../application/handlers/create-post.handler';
import { DeletePostHandler } from '../application/handlers/delete-post.handler';
import { GetAllPostHandler } from '../application/handlers/get-all-post.handler';
import { GetPostByIdHandler } from '../application/handlers/get-post-by-id.handler';
import { UpdatePostHandler } from '../application/handlers/update-post.handler';
import { UserRepository } from 'src/user/infrastructure/user.repository';
import { PostFactory } from './post-factory';
import { EventHandlers } from '../application/check-log';

@Module({
  providers: [
    PostService,
    PostRepository,
    UserRepository,
    CreatePostHandler,
    DeletePostHandler,
    GetAllPostHandler,
    GetPostByIdHandler,
    UpdatePostHandler,
    PostFactory,
    ...EventHandlers,
  ],
  controllers: [PostController],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
  ],
})
export class PostModule {}
