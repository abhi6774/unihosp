import { Body, Controller, Get, Headers, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { UserService } from "./user.service";
import { AccessTokenGuard } from "src/guards/accesstoken.guard";
import { User } from "@prisma/client";


enum ToCheckType {
    Email,
    Handle,
}

@Controller({
    path: 'user',
})
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    @UseGuards(AccessTokenGuard)
    getCurrentUser(@Req() req: Request) {
        const user: User = req.body["user"];
        return this.userService.user(
            {
                id: user.id,
            },
            {
                patient: true,
            },
        );
    }

    @Get(":id")
    getUserById(@Res() res: Response) {
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
