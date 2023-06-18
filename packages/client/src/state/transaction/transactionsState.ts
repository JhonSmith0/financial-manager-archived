import { ITransactionWithAccounts } from "@/interface"
import { hookstate } from "@hookstate/core"

const transactionsState = hookstate<ITransactionWithAccounts[]>([])

export function addTransaction(transaction: ITransactionWithAccounts) {
    transactionsState.merge([transaction])
}
export function setTransactions(transactions: ITransactionWithAccounts[]) {
    transactionsState.merge(transactions)
}

export default transactionsState
