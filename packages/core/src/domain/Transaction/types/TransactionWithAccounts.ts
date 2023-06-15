import Account from "@/domain/Account/entity";
import { Transaction } from "../entity";

export interface TransactionWithAccounts extends Transaction {
    fromAccount: Account;
    toAccount: Account;
}
