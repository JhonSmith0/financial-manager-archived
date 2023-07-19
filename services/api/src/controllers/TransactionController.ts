import { AccountUseCases } from "@libs/core/dist/domain/Account/useCases/AccountUseCases"
import { CreateTransactionDTO } from "@libs/core/dist/domain/Transaction/dto/CreateTransactionDTO"
import { SearchTransactionDTO } from "@libs/core/dist/domain/Transaction/dto/SearchTransactionDTO"
import { UpdateTransactionDTO } from "@libs/core/dist/domain/Transaction/dto/UpdateTransactionDTO"
import { TransactionUseCasesFactory } from "@libs/core/dist/domain/Transaction/factory/TransactionUseCasesFactory"
import User from "@libs/core/dist/domain/User/entity/User"
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

import { UserHasAcessToTransaction } from "../guards/UserHasAcessToTransaction"
import { AccountExists } from "../middlewares/AccountExists"

@UseGuards(UserHasAcessToTransaction)
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
    public async readTransaction(@Param("id") id: string) {
        return await this.transactionUseCases.read.execute(id)
    }

    @Delete("/:id")
    public async removeTransaction(@Param("id") id: string) {
        return await this.transactionUseCases.remove.execute({
            dto: { id },
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
