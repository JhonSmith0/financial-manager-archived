import CreateAccountDTO from "@financial/core/dist/domain/Account/dto/CreateAccountDTO"
import { DeleteAccountDTO } from "@financial/core/dist/domain/Account/dto/DeleteAccountDTO"
import { ReadAccountDTO } from "@financial/core/dist/domain/Account/dto/ReadAccountDTO"
import { SearchAccountDTO } from "@financial/core/dist/domain/Account/dto/SearchAccountDTO"
import UpdateAccountDTO from "@financial/core/dist/domain/Account/dto/UpdateAccountDTO"
import { AccountUseCases } from "@financial/core/dist/domain/Account/useCases/AccountUseCases"
import { TransactionUseCasesFactory } from "@financial/core/dist/domain/Transaction/factory/TransactionUseCasesFactory"
import User from "@financial/core/dist/domain/User/entity/User"
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common"
import { UserEntity } from "../decorators/UserEntity"
import { UserHasAcessToAccount } from "../guards/UserHasAcessToAccount"

@UseGuards(UserHasAcessToAccount)
@Controller("account")
export class AccountController {
    constructor(
        private accountUseCases: AccountUseCases,
        private transactionUseCases: TransactionUseCasesFactory
    ) {}

    @Post()
    async createAccount(
        @UserEntity() user: User,
        @Body() body: ClassProperties<CreateAccountDTO>
    ) {
        return await this.accountUseCases.create.execute({
            ...body,
            userId: user.id,
        })
    }

    @Get("search")
    async searchAccount(
        @UserEntity()
        user: User,
        @Query() dto: SearchAccountDTO
    ) {
        return await this.accountUseCases.search.execute({
            dto,
            user: { id: user.id },
        })
    }

    @Patch("/:id")
    async updateAccount(
        @UserEntity() user: User,
        @Body() body: any,
        @Param() dto: UpdateAccountDTO
    ) {
        return await this.accountUseCases.update.execute({ user, dto })
    }

    @Delete("/:id")
    async deleteAccount(
        @UserEntity() user: User,
        @Param() dto: DeleteAccountDTO
    ) {
        await this.transactionUseCases.removeAll.execute(dto.id)

        return await this.accountUseCases.remove.execute({ dto: dto, user })
    }

    @Get("/:id")
    async getAccount(@UserEntity() user: User, @Param() dto: ReadAccountDTO) {
        return await this.accountUseCases.read.execute({ accountId: dto.id })
    }

    @Get("/:accountId/transactions")
    async getAccountTransactions(
        @UserEntity() user: User,
        @Param() params: { accountId: string }
    ) {
        if (!params.accountId || typeof params.accountId !== "string")
            throw new BadRequestException("Invalid data!")
        return await this.transactionUseCases.accountTransactions.execute({
            accountId: params.accountId,
        })
    }
    @Get("/:accountId/balance")
    async accountBalance(
        @UserEntity() user: User,
        @Param() params: { accountId: string }
    ) {
        return await this.accountUseCases.balance.execute(params.accountId)
    }
}
