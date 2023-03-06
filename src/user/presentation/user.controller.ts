import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../application/commands/create-user.command';
import { DeleteUserCommand } from '../application/commands/delete-user.command';
import { UpdateUserCommand } from '../application/commands/update-user.command';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { UpdateUserDto } from '../domain/dto/update-user.dto';
import { GetAllUserQuery } from '../application/queries/get-all-user.query';
import { GetUserByIdQuery } from '../application/queries/get-user-by-id.query';

@Controller('users')
export class UserController {
  constructor(
    // private readonly service: UserService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // @Get()
  // async index() {
  //   return await this.service.findAll();
  // }

  // @Get(':id')
  // async find(@Param('id') id: string) {
  //   return await this.service.findOne(id);
  // }

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return await this.service.create(createUserDto);
  // }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return await this.service.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return await this.service.delete(id);
  // }

  @Post('create-by-command')
  async createUserByCommand(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  @Get('get-all-by-query')
  async findAllByQuery() {
    return this.queryBus.execute(new GetAllUserQuery());
  }

  @Get('get-user-by-query/:id')
  async findByQuery(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @Put('update-user-by-command/:id')
  async updateByCommand(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.commandBus.execute(new UpdateUserCommand(updateUserDto, id));
  }

  @Delete('delete-user-by-command/:id')
  async deleteByCommand(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
