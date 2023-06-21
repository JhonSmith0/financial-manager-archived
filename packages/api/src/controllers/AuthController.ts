import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    Post,
    Res,
} from "@nestjs/common"

import LoginController from "@financial/core/dist/controllers/auth/LoginController"
import MeController from "@financial/core/dist/controllers/auth/MeController"
import RegisterController from "@financial/core/dist/controllers/auth/RegisterController"

import RegisterUserDTO from "@financial/core/dist/domain/User/dto/CreateUserDTO"

import LoginUserDTO from "@financial/core/dist/domain/User/dto/LoginUserDTO"

import ControllerType from "@financial/core/dist/common/Controller"

import { Either } from "@financial/core/dist/common/ErrorHandlingTypes"
import { parse } from "cookie"
import { Request, Response } from "express"

@Controller("auth")
export default class AuthController {
    constructor(
        private loginController: LoginController,
        private registerController: RegisterController,
        private meController: MeController
    ) {}

    private async handle<T>(
        controller: ControllerType<T, Either<any, any>>,
        dto: { create(data: T): any },
        res: Response,
        body: T
    ) {
        const obj = dto.create(body)
        const result = await controller.handle(obj)

        if (result.isLeft()) throw result.value
        this.setJWTOnCookie(res, result.value).end()
    }

    private setJWTOnCookie(res: Response, jwt: string) {
        res.cookie("authorization", jwt)

        return res
    }

    @Post("login")
    @HttpCode(200)
    async login(@Body() body: LoginUserDTO, @Res() res: Response) {
        await this.handle(this.loginController, LoginUserDTO, res, body)
    }

    @Post("register")
    @HttpCode(201)
    async register(@Body() body: RegisterUserDTO, @Res() res: Response) {
        await this.handle(this.registerController, RegisterUserDTO, res, body)
    }

    @Get("me")
    async me(@Headers() headers: Request["headers"]) {
        const { authorization } = parse(headers.cookie ?? "")
        const result = await this.meController.handle(authorization)
        return result
    }
}
