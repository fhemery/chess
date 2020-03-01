import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@chess/shared/types';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Post()
  public register(@Body('name') name: any): User {
    if (this.userService.checkByName(name)) {
      throw new UnauthorizedException();
    }

    return this.userService.register(name);
  }
}
