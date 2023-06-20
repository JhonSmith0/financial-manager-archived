import {
    accountBalance,
    readAccount,
    readAccountTransactionsService,
} from "@/services/account"
import { LoaderFunctionArgs } from "react-router-dom"

export async function accountPage(params: LoaderFunctionArgs) {
    const id = params.params.id as string

    const account = await readAccount(id)
    const transactions = await readAccountTransactionsService(id)
    const balance = await accountBalance(id)

    return { account, transactions, balance }
}

export interface AccountPageInfos
    extends Awaited<ReturnType<typeof accountPage>> {}
