import loginSchema from "@/schemas/auth/loginSchema"
import registerSchema from "@/schemas/auth/registerSchema"
import newTransactionSchema from "@/schemas/transaction/newTransactionSchema"
import * as y from "yup"
export type ILoginSchema = y.InferType<typeof loginSchema>
export type IRegisterSchema = y.InferType<typeof registerSchema>

export interface IUser {
    name: string
    id: string
    photo: string
    email: string
}

export interface IAccount {
    userId: string
    description: string
    name: string
    id: string
}

export interface ITransaction {
    date: Date
    description: string
    amount: number
    id: string
    fromAccountId: string
    toAccountId: string
}
export interface ITransactionWithAccounts extends ITransaction {
    fromAccount: IAccount
    toAccount: IAccount
}

export type TransactionCreate = y.InferType<typeof newTransactionSchema>
export interface GetTransactions {
    page?: number
}

export type AccountCreate = Pick<IAccount, "description" | "name">
export type AccountUpdate = AccountCreate & Pick<IAccount, "id">

export interface SearchAccount {
    name: string
}

export type RemoveTransaction = Pick<ITransaction, "id">
export type UpdateTransaction = Partial<ITransaction> & Pick<ITransaction, "id">
