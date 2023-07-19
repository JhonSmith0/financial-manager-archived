import Account from "@/domain/Account/entity"
import { Transaction } from "."
import { TransactionWithAccountsProps } from "../types/TransactionWithAccountsProps"
import { Transformer } from "@/common/Transformer"

export class TransactionWithAccounts extends Transaction {
    public fromAccount: Account
    public toAccount: Account

    constructor(data: TransactionWithAccountsProps) {
        super()
        Transformer.assignPlainToInstance(TransactionWithAccounts, data, this)
    }
}
