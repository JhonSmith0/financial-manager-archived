import Account from "@/domain/Account/entity";
import { Transaction } from "../entity";
import { TransactionProps } from "./TransactionProps";

export interface TransactionWithAccountsProps extends TransactionProps {
  fromAccount: Account;
  toAccount: Account;
}

