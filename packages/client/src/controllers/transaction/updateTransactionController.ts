import { UpdateTransaction } from "@/interface"
import {
    getTransactionService,
    updateTransactionService,
} from "@/services/transaction"

export async function updateTransactionController(data: UpdateTransaction) {
    await updateTransactionService(data)
    await getTransactionService({})
}
