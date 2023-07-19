import { UseCase } from "@/common/UseCase"
import { AccountRepository } from "../repo/AccountRepository"
import { left, right } from "@/common/ErrorHandlingTypes"
import NotFoundError from "@/common/errors/NotFoundError"
import User from "@/domain/User/entity/User"

export class AccountOwnerUseCase extends UseCase<string> {
    constructor(private repo: AccountRepository) {
        super()
    }
    public async execute(accountId: string) {
        const account = await this.repo.db.findUnique({
            where: {
                id: accountId,
            },
            include: {
                user: {},
            },
        })

        if (!account)
            return left(new NotFoundError("Account not found!", ["id"]))

        return right(User.create(account.user))
    }
}
