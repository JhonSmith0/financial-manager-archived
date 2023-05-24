import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';

import LoginController from '@financial/core/dist/controllers/auth/LoginController';

import LoginUserDTO from '@financial/core/dist/domain/User/dto/LoginUserDTO';
import adaptErrors from './adapters/adaptErrors';
import { Response } from 'express';

@Controller('auth')
export default class AuthController {
  constructor(private loginController: LoginController) {}

  private setJWTOnCookie(res: Response, jwt: string) {
    res.cookie('authorization', jwt);

    return res;
  }

  @Post('login')
  @HttpCode(204)
  async login(@Body() body: LoginUserDTO, @Res() res: Response) {
    const obj = LoginUserDTO.create(body);
    const result = await this.loginController.handle(obj);

    if (result._tag == 'Left') throw adaptErrors(result.left as any);
    this.setJWTOnCookie(res, result.right).end();
  }
}
