import Account from "@/domain/Account/entity";
import { Transaction } from "../entity";

export interface TransactionWithAccountsProps extends Transaction {
    fromAccount: Account;
    toAccount: Account;
}
