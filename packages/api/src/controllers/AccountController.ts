import { LeftRightHandler } from "@financial/core/dist/common/decorators/LeftRightHandler";
import CreateAccountDTO from "@financial/core/dist/domain/Account/dto/CreateAccountDTO";
import { DeleteAccountDTO } from "@financial/core/dist/domain/Account/dto/DeleteAccountDTO";
import { ReadAccountDTO } from "@financial/core/dist/domain/Account/dto/ReadAccountDTO";
import { SearchAccountDTO } from "@financial/core/dist/domain/Account/dto/SearchAccountDTO";
import UpdateAccountDTO from "@financial/core/dist/domain/Account/dto/UpdateAccountDTO";
import { AccountUseCases } from "@financial/core/dist/domain/Account/useCases/AccountUseCases";
import { TransactionUseCasesFactory } from "@financial/core/dist/domain/Transaction/factory/TransactionUseCasesFactory";
import User from "@financial/core/dist/domain/User/entity/User";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { AdaptErrors } from "../adapters/adaptErrors";
import { UserEntity } from "../decorators/UserEntity";

@Controller("account")
export class AccountController {
  constructor(
    private accountUseCases: AccountUseCases,
    private transactionUseCases: TransactionUseCasesFactory
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

    return await this.accountUseCases.create.exec({
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

    return await this.accountUseCases.search.execute({
      dto,
      user: { id: user.id },
    });
  }

  @Patch("/:id")
  @AdaptErrors()
  @LeftRightHandler()
  async updateAccount(
    @UserEntity() user: User,
    @Body() body: any,
    @Param() params: { id: string }
  ) {
    const dto = UpdateAccountDTO.create({ ...body, id: params.id });
    const validation = await dto.validate();
    if (validation.length) throw validation;

    return await this.accountUseCases.update.execute({ user, dto });
  }

  @Delete("/:id")
  @AdaptErrors()
  @LeftRightHandler()
  async deleteAccount(@UserEntity() user: User, @Param() params: any) {
    const obj = DeleteAccountDTO.create(params);
    const validation = await obj.validate();
    if (validation.length) throw validation;

    await this.transactionUseCases.removeAll.execute({
      userId: {
        equals: user.id,
      },
      fromAccountId: {
        equals: obj.id,
      },
    });
    await this.transactionUseCases.removeAll.execute({
      userId: {
        equals: user.id,
      },
      toAccountId: {
        equals: obj.id,
      },
    });

    return await this.accountUseCases.remove.execute({ dto: obj, user });
  }

  @Get("/:id")
  @AdaptErrors()
  @LeftRightHandler()
  async getAccount(@UserEntity() user: User, @Param() params: any) {
    const obj = new ReadAccountDTO(params);
    const validation = await obj.validate();
    if (validation.length) throw validation;

    return await this.accountUseCases.read.execute({ accountId: params.id });
  }
}

