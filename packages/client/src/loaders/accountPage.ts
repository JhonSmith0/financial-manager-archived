import {
    accountBalance,
    readAccount,
    readAccountTransactionsService,
} from "@/services/account"
import { LoaderFunctionArgs } from "react-router-dom"

export async function accountPage(params: LoaderFunctionArgs) {
    const id = params.params.id as string

    const account = await readAccount(id)

    return { account }
}

export interface AccountPageInfos
    extends Awaited<ReturnType<typeof accountPage>> {}
