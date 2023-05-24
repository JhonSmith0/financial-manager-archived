import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';

import LoginController from '@financial/core/dist/controllers/auth/LoginController';
import RegisterController from '@financial/core/dist/controllers/auth/RegisterController';

import RegisterUserDTO from '@financial/core/dist/domain/User/dto/CreateUserDTO';
import LoginUserDTO from '@financial/core/dist/domain/User/dto/LoginUserDTO';

import ControllerType from '@financial/core/dist/common/Controller';

import { Response } from 'express';
import adaptErrors from './adapters/adaptErrors';

@Controller('auth')
export default class AuthController {
  constructor(
    private loginController: LoginController,
    private registerController: RegisterController,
  ) {}

  private async handle<T>(
    controller: ControllerType<T, any>,
    dto: { create(data: T): any },
    res: Response,
    body: T,
  ) {
    const obj = dto.create(body);
    const result = await controller.handle(obj);

    if (result._tag == 'Left') throw adaptErrors(result.left as any);
    this.setJWTOnCookie(res, result.right).end();
  }

  private setJWTOnCookie(res: Response, jwt: string) {
    res.cookie('authorization', jwt);

    return res;
  }

  @Post('login')
  @HttpCode(204)
  async login(@Body() body: LoginUserDTO, @Res() res: Response) {
    await this.handle(this.loginController, LoginUserDTO, res, body);
  }

  @Post('register')
  @HttpCode(204)
  async register(@Body() body: RegisterUserDTO, @Res() res: Response) {
    await this.handle(this.registerController, RegisterUserDTO, res, body);
  }
}
