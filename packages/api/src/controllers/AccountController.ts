import { LeftRightHandler } from "@financial/core/dist/common/decorators/LeftRightHandler";
import CreateAccountDTO from "@financial/core/dist/domain/Account/dto/CreateAccountDTO";
import CreateAccountUseCase from "@financial/core/dist/domain/Account/useCases/CreateAccountUseCase";
import { Body, Controller, Post } from "@nestjs/common";
import { AdaptErrors } from "../adapters/adaptErrors";
import { UserEntity } from "@/decorators/UserEntity";
import User from "@financial/core/dist/domain/User/entity/User";

@Controller("account")
export class AccountController {
  constructor(private createUseCase: CreateAccountUseCase) {}

  @Post()
  @AdaptErrors()
  @LeftRightHandler()
  async createAccount(
    @UserEntity() user: User,
    @Body() body: ClassProperties<CreateAccountDTO>
  ) {
    const parsedObj = CreateAccountDTO.create(body);

    return await this.createUseCase.exec({
      ...parsedObj,
      userId: user.id,
    });
  }
}
