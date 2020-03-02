import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@chess/shared/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public register(@Body('name') name: any): User {
    if (this.userService.checkByName(name)) {
      throw new UnauthorizedException();
    }

    return this.userService.register(name);
  }

  @Get(':id')
  public get(@Param('id') id: string): User {
    const user = this.userService.getById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
