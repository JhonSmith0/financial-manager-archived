import { IAccount, ITransactionWithAccounts } from "@/interface"
import {
    accountBalance,
    readAccount,
    readAccountTransactionsService,
} from "@/services/account"
import { InferStateValueType, useHookstate } from "@hookstate/core"
import { useEffect } from "react"

export function useAccount(id: string, deps = []) {
    const transactionsState = useHookstate<ITransactionWithAccounts[]>([])
    const balanceState = useHookstate<number>(0)
    const accountState = useHookstate<IAccount | null>(null)

    async function read() {
        const acc = await readAccount(id)
        const balance = await accountBalance(id)
        const trs = await readAccountTransactionsService(id)

        transactionsState.set(trs)
        balanceState.set(balance)
        accountState.set(acc)
    }

    useEffect(() => {
        read()
    }, [id, ...deps])

    return {
        transactions: transactionsState.get() as InferStateValueType<
            typeof transactionsState
        >,
        balance: balanceState.get(),
        account: accountState.get(),
        read,
    }
}
