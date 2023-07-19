import { ITransaction } from "@/interface"
import { removeTransactionService } from "@/services/transaction"
import { getTransactionsController } from "."

export async function removeTransactionController(transaction: {
    id: ITransaction["id"]
}) {
    await removeTransactionService(transaction)
    await getTransactionsController({})
}
