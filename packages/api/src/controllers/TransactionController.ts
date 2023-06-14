import { LeftRightHandler } from "@financial/core/dist/common/decorators/LeftRightHandler";
import { CreateTransactionDTO } from "@financial/core/dist/domain/Transaction/dto/CreateTransactionDTO";
import { SearchTransactionDTO } from "@financial/core/dist/domain/Transaction/dto/SearchTransactionDTO";
import { TransactionUseCasesFactory } from "@financial/core/dist/domain/Transaction/factory/TransactionUseCasesFactory";
import User from "@financial/core/dist/domain/User/entity/User";
import {
  Body,
  Controller,
  Get,
  Post
} from "@nestjs/common";
import { AdaptErrors } from "../adapters/adaptErrors";
import { UserEntity } from "../decorators/UserEntity";

@Controller("transaction")
export class TransactionController {
  constructor(private transactionUseCases: TransactionUseCasesFactory) {}

  @Post()
  @AdaptErrors()
  @LeftRightHandler()
  public async create(@UserEntity() user: User, @Body() body: any) {
    const dto = new CreateTransactionDTO(body);
    const validation = await dto.validate();
    if (validation.length) throw validation;

    return await this.transactionUseCases.create.execute({ dto, user });
  }

  @Get("search")
  @AdaptErrors()
  @LeftRightHandler()
  public async search(@UserEntity() user: User, @Body() body: any) {
    const dto = new SearchTransactionDTO(body);
    const validation = await dto.validate();
    if (validation.length) throw validation;
    return await this.transactionUseCases.search.execute({ dto, user });
  }
}
