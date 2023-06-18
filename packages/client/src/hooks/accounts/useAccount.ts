import { IAccount, ITransactionWithAccounts } from "@/interface"
import {
    accountBalance,
    readAccount,
    readAccountTransactionsService,
} from "@/services/account"
import { useHookstate } from "@hookstate/core"
import { useEffect } from "react"

export function useAccount(id: string) {
    const transactionsState = useHookstate<ITransactionWithAccounts[]>([])
    const balanceState = useHookstate<number>(0)
    const accountState = useHookstate<IAccount | null>(null)

    useEffect(() => {
        ;(async function () {
            const acc = await readAccount(id)
            const balance = await accountBalance(id)
            const trs = await readAccountTransactionsService(id)

            transactionsState.set(trs)
            balanceState.set(balance)
            accountState.set(acc)
        })()
    }, [id])

    return {
        transactions: transactionsState.get(),
        balance: balanceState.get(),
        account: accountState.get(),
    }
}
