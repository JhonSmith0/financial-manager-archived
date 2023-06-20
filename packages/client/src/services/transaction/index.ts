import {
    ITransaction,
    GetTransactions,
    TransactionCreate,
    UpdateTransaction,
    ITransactionWithAccounts,
} from "@/interface"
import api from "../http"

export async function updateTransactionService(data: UpdateTransaction) {
    return (await api.patch(`/api/transaction/${data.id}`, data)).data as void
}

export async function removeTransactionService(data: Pick<ITransaction, "id">) {
    return (await api.delete(`/api/transaction/${data.id}`)).data as void
}

export async function readTransactionService(data: ITransaction) {
    return (await api.get(`/api/transaction/${data.id}`))
        .data as ITransactionWithAccounts
}
export async function newTransactionService(data: TransactionCreate) {
    return (await api.post("/api/transaction", data)).data as ITransaction
}

export async function getTransactionService(data: GetTransactions) {
    return (await api.get("/api/transaction/search", { params: data }))
        .data as {
        results: ITransactionWithAccounts[]
    }
}
