import { left, right } from "@/common/ErrorHandlingTypes"
import NotFoundError from "@/common/errors/NotFoundError"
import { DeleteTransactionDTOProps } from "../dto/DeleteTransactionDTO"
import { TransactionUseCase } from "./TransactionUseCase"

interface Prop {
    dto: DeleteTransactionDTOProps
}

export class DeleteTransactionUseCase extends TransactionUseCase {
    public async execute(data: Prop) {
        const transaction = await this.transactionRepo.db.findUnique({
            where: {
                id: data.dto.id,
            },
        })

        if (!transaction)
            return left(new NotFoundError("Account not found!", ["id"]))

        await this.transactionRepo.db.delete({
            where: {
                id: data.dto.id,
            },
        })

        return right(null)
    }
}
