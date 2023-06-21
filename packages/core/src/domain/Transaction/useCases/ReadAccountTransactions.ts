import { UseCase } from "@/common/UseCase"
import { TransactionRepository } from "../repo/TransactionRepository"
import { right } from "@/common/ErrorHandlingTypes"
import { linkProto } from "@/common/utils/linkProto"
import { TransactionWithAccounts } from "../entity/TransactionWithAccounts"

interface Props {
    accountId: string
}

export class ReadAccountTransactionsUseCase extends UseCase<Props> {
    constructor(private repo: TransactionRepository) {
        super()
    }

    public async execute(data: Props) {
        const transactions = await this.repo.db.findMany({
            where: {
                OR: [
                    { fromAccountId: data.accountId },
                    { toAccountId: data.accountId },
                ],
            },
            include: {
                fromAccount: {},
                toAccount: {},
            },
        })

        return right(
            transactions.map((e) => linkProto(TransactionWithAccounts, e))
        )
    }
}
