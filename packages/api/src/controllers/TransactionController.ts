import { LeftRightHandler } from "@financial/core/dist/common/decorators/LeftRightHandler";
import { CreateTransactionDTO } from "@financial/core/dist/domain/Transaction/dto/CreateTransactionDTO";
import { DeleteTransactionDTO } from "@financial/core/dist/domain/Transaction/dto/DeleteTransactionDTO";
import { ReadTransactionDTO } from "@financial/core/dist/domain/Transaction/dto/ReadTransactionDTO";
import { SearchTransactionDTO } from "@financial/core/dist/domain/Transaction/dto/SearchTransactionDTO";
import { UpdateTransactionDTO } from "@financial/core/dist/domain/Transaction/dto/UpdateTransactionDTO";
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

  @Get("/:id")
  @AdaptErrors()
  @LeftRightHandler()
  public async readTransaction(@Param() params: any) {
    const dto = new ReadTransactionDTO(params);
    const validation = await dto.validate();
    if (validation.length) throw validation;
    return await this.transactionUseCases.read.execute(dto.id);
  }

  @Delete("/:id")
  @AdaptErrors()
  @LeftRightHandler()
  public async removeTransaction(@Param() params: any) {
    const dto = new DeleteTransactionDTO(params);
    const validation = await dto.validate();
    if (validation.length) throw validation;
    return await this.transactionUseCases.remove.execute({
      dto: { id: dto.id },
    });
  }

  @Patch("/:id")
  @AdaptErrors()
  @LeftRightHandler()
  public async updateTransaction(
    @Param() params: any,
    @Body() body: UpdateTransactionDTO
  ) {
    const dto = new UpdateTransactionDTO(body);
    const validation = await dto.validate();
    if (validation.length) throw validation;
    return await this.transactionUseCases.update.execute({
      dto,
      transaction: {
        id: params.id,
      },
    });
  }
}
