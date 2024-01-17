import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";

@Controller({
    path: 'user',
})
export class UserController {

    @Get(":id")
    getUserById(@Res() res: Response) {
    }
}
