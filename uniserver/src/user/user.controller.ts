import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from '../guards/accesstoken.guard';
import { User } from '@prisma/client';
import excludePassword from '../utils/excludePassword';

enum ToCheckType {
  Email,
  Handle,
}

@Controller({
  path: 'user',
})
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  async getCurrentUser(@Req() req: Request) {
    const user: User = req['user'];
    const d = await this.userService.user(
      {
        id: user.id,
      },
      {
        patient: true,
      },
    );
    return excludePassword(d, ['password']);
  }

  @Get(':id')
  getUserById() {
    throw new Error('Not Implemented');
  }

  @Post('exists')
  async doesExists(@Body() data: { email?: string }) {
    const { email } = data;

    const toCheck = email ? ToCheckType.Email : null;
    let response: any;

    switch (toCheck) {
      case ToCheckType.Email:
        if (await this.userService.user({ email })) {
          console.log(await this.userService.user({ email }));
          response = {
            email: true,
          };
        }
        break;
      default:
        return {
          error: '401',
          email: false,
          handle: false,
        };
    }

    return response
      ? response
      : {
          error: '401',
          email: false,
          handle: false,
        };
  }

  @Post('users')
  getAllUsers(@Body() data: any) {
    return this.userService.users({ ...data });
  }
}
