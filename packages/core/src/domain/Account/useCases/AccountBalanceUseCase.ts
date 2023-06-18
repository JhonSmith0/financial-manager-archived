import { left, right } from "@/common/ErrorHandlingTypes"
import { UseCase } from "@/common/UseCase"
import NotFoundError from "@/common/errors/NotFoundError"
import { AccountRepository } from "../repo/AccountRepository"

export class AccountBalanceUseCase extends UseCase<string> {
    constructor(private accRepo: AccountRepository) {
        super()
    }
    public async execute(id: string) {
        const account = await this.accRepo.db.findUnique({
            where: {
                id,
            },
        })

        if (!account)
            return left(new NotFoundError("Account not found!", ["id"]))

        const creditTransactions = await this.accRepo.transaction.aggregate({
            where: {
                fromAccountId: id,
            },
            _sum: {
                amount: true,
            },
        })

        const debitTransactions = await this.accRepo.transaction.aggregate({
            where: {
                toAccountId: id,
            },
            _sum: {
                amount: true,
            },
        })

        const creditValue = creditTransactions._sum?.amount || 0
        const debitValue = debitTransactions._sum?.amount || 0

        return right(debitValue - creditValue)
    }
}
