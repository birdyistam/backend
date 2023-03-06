import { BaseUserDto } from './base-user.dto';

export class UpdateUserDto extends BaseUserDto {
  completedAt: Date;
}
