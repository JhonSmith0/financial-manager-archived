import { AccountUseCases } from "@financial/core/dist/domain/Account/useCases/AccountUseCases"
import { CreateTransactionDTO } from "@financial/core/dist/domain/Transaction/dto/CreateTransactionDTO"
import { DeleteTransactionDTO } from "@financial/core/dist/domain/Transaction/dto/DeleteTransactionDTO"
import { ReadTransactionDTO } from "@financial/core/dist/domain/Transaction/dto/ReadTransactionDTO"
import { SearchTransactionDTO } from "@financial/core/dist/domain/Transaction/dto/SearchTransactionDTO"
import { UpdateTransactionDTO } from "@financial/core/dist/domain/Transaction/dto/UpdateTransactionDTO"
import { TransactionUseCasesFactory } from "@financial/core/dist/domain/Transaction/factory/TransactionUseCasesFactory"
import User from "@financial/core/dist/domain/User/entity/User"
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common"
import { UserEntity } from "../decorators/UserEntity"

import { AccountExists } from "../middlewares/AccountExists"

@Controller("transaction")
export class TransactionController {
    constructor(
        private transactionUseCases: TransactionUseCasesFactory,
        private accountUseCases: AccountUseCases
    ) {}

    @UseGuards(AccountExists)
    @Post()
    public async create(
        @UserEntity() user: User,
        @Body() dto: CreateTransactionDTO
    ) {
        return await this.transactionUseCases.create.execute({ dto, user })
    }

    @Get("search")
    public async search(
        @UserEntity() user: User,
        @Body() dto: SearchTransactionDTO
    ) {
        return await this.transactionUseCases.search.execute({ dto, user })
    }

    @Get("/:id")
    public async readTransaction(@Param() dto: ReadTransactionDTO) {
        return await this.transactionUseCases.read.execute(dto.id)
    }

    @Delete("/:id")
    public async removeTransaction(@Param() dto: DeleteTransactionDTO) {
        return await this.transactionUseCases.remove.execute({
            dto: { id: dto.id },
        })
    }

    @Patch("/:id")
    public async updateTransaction(
        @Param() params: any,
        @Body() dto: UpdateTransactionDTO
    ) {
        return await this.transactionUseCases.update.execute({
            dto,
            transaction: {
                id: params.id,
            },
        })
    }
}
