import { BasicRepository } from "@/common/repo/BasicRepository";
import { TransactionProps } from "./TransactionProps";
import { TransactionWithAccountsProps } from "./TransactionWithAccountsProps";
import { Transaction } from "../entity";

export interface TransactionRepository
    extends BasicRepository<
        TransactionProps,
        TransactionProps["id"],
        Partial<TransactionProps>
    > {
    readTransactionWithAccounts(
        id: Transaction["id"]
    ): Promise<TransactionWithAccountsProps | void>;
}
