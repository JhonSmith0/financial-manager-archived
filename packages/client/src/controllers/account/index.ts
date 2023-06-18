import { readAccountTransactionsService } from "@/services/account"
import accountsState from "@/state/accountsState"
import { setTransactions } from "@/state/transaction/transactionsState"

export async function readAccountController(id: string) {
    return accountsState.get({ noproxy: true }).find((e) => e.id === id)
}

export async function readAccountTransactions(id: string) {
    const result = await readAccountTransactionsService(id)
    setTransactions(result)
}
