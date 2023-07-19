import { TransactionUseCasesFactory } from "@libs/core/dist/domain/Transaction/factory/TransactionUseCasesFactory"
import User from "@libs/core/dist/domain/User/entity/User"
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Request } from "express"

@Injectable()
export class UserHasAcessToTransaction implements CanActivate {
    constructor(private transactionUseCases: TransactionUseCasesFactory) {}
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context
            .switchToHttp()
            .getRequest<Request & { user: User }>()
        const id = req.params.id
        if (!id) return true

        const user = req.user

        const transactionOwner =
            await this.transactionUseCases.transactionOwner.execute(id)
        if (transactionOwner.isLeft()) throw transactionOwner.value

        return transactionOwner.value.id === user.id
    }
}
