import { AccountUseCases } from "@financial/core/dist/domain/Account/useCases/AccountUseCases"
import User from "@financial/core/dist/domain/User/entity/User"
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
} from "@nestjs/common"
import { Request } from "express"

@Injectable()
export class UserHasAcessToAccount implements CanActivate {
    constructor(private accountUseCases: AccountUseCases) {}
    public async canActivate(context: ExecutionContext) {
        const req = context
            .switchToHttp()
            .getRequest<Request & { user: User }>()
        const accountId = req.params.id
        if (!accountId) return true
        const user = req.user
        if (user.role === "admin") return true

        const accountOwner = await this.accountUseCases.accountOwner.execute(
            accountId
        )

        if (accountOwner.isLeft()) throw accountOwner.value

        if (accountOwner.value.id !== user.id) {
            throw new NotFoundException("Account not found!")
        }

        return accountOwner.value.id === user.id
    }
}
