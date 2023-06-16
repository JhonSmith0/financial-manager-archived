import { Query } from "@/common/Query";
import { BasicRepository } from "@/common/repo/BasicRepository";
import { Transaction } from "../entity";
import { TransactionProps } from "./TransactionProps";
import { TransactionWithAccountsProps } from "./TransactionWithAccountsProps";

export interface TransactionRepository
  extends BasicRepository<
    TransactionProps,
    TransactionProps["id"],
    Partial<TransactionProps>
  > {
  readTransactionWithAccounts(
    id: Transaction["id"]
  ): Promise<TransactionWithAccountsProps | void>;
  search(
    query: Query<TransactionProps>,
    skip: number,
    limit: number
  ): Promise<TransactionWithAccountsProps[]>;
}

