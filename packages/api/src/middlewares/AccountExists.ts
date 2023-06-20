import { AccountUseCases } from "@financial/core/dist/domain/Account/useCases/AccountUseCases"
import { CreateTransactionDTO } from "@financial/core/dist/domain/Transaction/dto/CreateTransactionDTO"
import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
} from "@nestjs/common"
import { every } from "async"
import { Request } from "express"

@Injectable()
export class AccountExists implements CanActivate {
    constructor(private accounts: AccountUseCases) {}
    public async canActivate(context: ExecutionContext) {
        const req: Request = context.switchToHttp().getRequest()

        const body = req.body as CreateTransactionDTO
        const ids = [body.fromAccountId, body.toAccountId]

        const accounts = await every(ids, async (id) => {
            const result = await this.accounts.read.execute({
                accountId: id,
            })
            return result.isRight()
        })

        if (!accounts) throw new BadRequestException("Account not found")

        return true
    }
}
