import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from '../domain/dto/create-post.dto';
import { UpdatePostDto } from '../domain/dto/update-post.dto';
// import { PostService } from './post.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllPostQuery } from '../application/queries/get-all-post.query';
import { GetPostByIdQuery } from '../application/queries/get-post-by-id.query';
import { CreatePostCommand } from '../application/commands/create-post.command';
import { UpdatePostCommand } from '../application/commands/update-post.command';
import { DeletePostCommand } from '../application/commands/delete-post.command';

@Controller('posts')
export class PostController {
  /* constructor(private readonly service: PostService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.service.create(createPostDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.service.update(id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  } */
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('')
  async findAllByQuery() {
    return this.queryBus.execute(new GetAllPostQuery());
  }
  @Post(':id')
  async findPostByQuery(@Param('id') id: string) {
    return this.queryBus.execute(new GetPostByIdQuery(id));
  }

  @Get()
  async addPostByCommand(@Body() createPostDto: CreatePostDto) {
    return this.commandBus.execute(new CreatePostCommand(createPostDto));
  }

  @Put(':id')
  async updateByCommand(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.commandBus.execute(new UpdatePostCommand(updatePostDto, id));
  }

  @Delete(':id')
  async deleteByCommand(@Param('id') id: string) {
    return this.commandBus.execute(new DeletePostCommand(id));
  }
}
