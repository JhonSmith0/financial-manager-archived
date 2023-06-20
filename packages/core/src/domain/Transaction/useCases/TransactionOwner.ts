import { UseCase } from "@/common/UseCase"
import { TransactionRepository } from "../repo/TransactionRepository"
import { left, right } from "@/common/ErrorHandlingTypes"
import NotFoundError from "@/common/errors/NotFoundError"
import User from "@/domain/User/entity/User"

export class TransactionOwnerUseCase extends UseCase<string> {
    constructor(private repo: TransactionRepository) {
        super()
    }
    public async execute(transactionId: string) {
        const transaction = await this.repo.db.findUnique({
            where: {
                id: transactionId,
            },
            include: {
                user: {},
            },
        })

        if (!transaction)
            return left(new NotFoundError("Transaction not found!", ["id"]))

        return right(User.create(transaction.user))
    }
}
