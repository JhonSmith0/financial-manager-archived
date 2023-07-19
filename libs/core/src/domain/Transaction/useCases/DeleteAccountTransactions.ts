import { UseCase } from "@/common/UseCase"
import { TransactionRepository } from "../repo/TransactionRepository"
import { right } from "@/common/ErrorHandlingTypes"

export class DeleteAccountTransactions extends UseCase<string> {
    constructor(private repo: TransactionRepository) {
        super()
    }
    public async execute(id: string) {
        const result = await this.repo.db.deleteMany({
            where: {
                OR: [
                    {
                        fromAccountId: id,
                    },
                    {
                        toAccountId: id,
                    },
                ],
            },
        })

        return right(result.count)
    }
}
