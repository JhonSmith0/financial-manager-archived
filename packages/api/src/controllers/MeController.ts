import MeController from "@financial/core/dist/controllers/auth/MeController";
import User from "@financial/core/dist/domain/User/entity/User";
import { Controller, Get } from "@nestjs/common";
import { adaptErrorsDecorator } from "../adapters/adaptErrors";
import { UserEntity } from "../decorators/UserEntity";

@Controller("")
export class GetMeController {
  constructor(private meController: MeController) {}

  @Get("me")
  @adaptErrorsDecorator()
  async me(
    @UserEntity()
    user: User
  ) {
    return { user };
  }
}
