import { adaptErrorsDecorator } from "../adapters/adaptErrors";
import MeController from "@financial/core/dist/controllers/auth/MeController";
import { Controller, Get, Headers } from "@nestjs/common";
import { parse } from "cookie";
import { Request } from "express";

@Controller("")
export class GetMeController {
  constructor(private meController: MeController) {}

  @Get("me")
  @adaptErrorsDecorator()
  async me(@Headers() headers: Request["headers"]) {
    const { authorization } = parse(headers.cookie);
    const result = await this.meController.handle(authorization);
    return result;
  }
}
