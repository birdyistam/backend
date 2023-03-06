import { UpdateUserDto } from '../../domain/dto/update-user.dto';

export class UpdateUserCommand {
  constructor(
    readonly updateUserDto: UpdateUserDto,
    readonly username: string,
  ) {}
}
