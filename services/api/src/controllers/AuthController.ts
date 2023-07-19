import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    Post,
    Res,
} from "@nestjs/common"

import LoginController from "@libs/core/dist/controllers/auth/LoginController"
import RegisterController from "@libs/core/dist/controllers/auth/RegisterController"
import MeController from "@libs/core/dist/controllers/auth/MeController"

import RegisterUserDTO from "@libs/core/dist/domain/User/dto/CreateUserDTO"

import LoginUserDTO from "@libs/core/dist/domain/User/dto/LoginUserDTO"

import ControllerType from "@libs/core/dist/common/Controller"

import { Request, Response } from "express"
import { AdaptErrors } from "../adapters/adaptErrors"
import { parse } from "cookie"
import { Either } from "@libs/core/dist/common/ErrorHandlingTypes"

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
    @HttpCode(204)
    async login(@Body() body: LoginUserDTO, @Res() res: Response) {
        console.log(body)
        await this.handle(this.loginController, LoginUserDTO, res, body)
    }

    @Post("register")
    @HttpCode(204)
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
