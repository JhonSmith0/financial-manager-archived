import { LeftRightHandler } from "@financial/core/dist/common/decorators/LeftRightHandler";
import CreateAccountDTO from "@financial/core/dist/domain/Account/dto/CreateAccountDTO";
import { SearchAccountDTO } from "@financial/core/dist/domain/Account/dto/SearchAccountDTO";
import CreateAccountUseCase from "@financial/core/dist/domain/Account/useCases/CreateAccountUseCase";
import { SearchAccountUseCase } from "@financial/core/dist/domain/Account/useCases/SearchAccountUseCase";
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AdaptErrors } from "../adapters/adaptErrors";
import { UserEntity } from "@/decorators/UserEntity";
import User from "@financial/core/dist/domain/User/entity/User";

@Controller("account")
export class AccountController {
  constructor(
    private createUseCase: CreateAccountUseCase,
    private searchUseCase: SearchAccountUseCase
  ) {}

  @Post()
  @AdaptErrors()
  @LeftRightHandler()
  async createAccount(
    @UserEntity() user: User,
    @Body() body: ClassProperties<CreateAccountDTO>
  ) {
    const parsedObj = CreateAccountDTO.create(body);
    const validation = await parsedObj.validate();
    if (validation.length) throw validation;

    return await this.createUseCase.exec({
      ...parsedObj,
      userId: user.id,
    });
  }

  @Get("search")
  @AdaptErrors()
  @LeftRightHandler()
  async searchAccount(
    @UserEntity()
    user: User,
    @Query() query: SearchAccountDTO
  ) {
    const dto = SearchAccountDTO.create(query);
    const validation = await dto.validate();
    if (validation.length) throw validation;

    return await this.searchUseCase.execute({ dto, user: { id: user.id } });
  }
}
