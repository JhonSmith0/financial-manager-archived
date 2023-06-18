import { left, right } from "@/common/ErrorHandlingTypes"
import { UseCase } from "@/common/UseCase"
import NotFoundError from "@/common/errors/NotFoundError"
import { AccountRepository } from "../repo/AccountRepository"
import Account from "../entity"

interface Props {
    accountId: string
}

export class ReadAccountUseCase extends UseCase<Props> {
    constructor(private repo: AccountRepository) {
        super()
    }

    public async execute(data: Props) {
        const acc = await this.repo.db.findUnique({
            where: {
                id: data.accountId,
            },
        })

        if (!acc) return left(new NotFoundError("Account not found!", ["id"]))

        return right(Account.create(acc))
    }
}
