import { ITransactionWithAccounts } from "@/interface";
import { hookstate } from "@hookstate/core";

const transactionsState = hookstate<ITransactionWithAccounts[]>([]);

export function addTransaction(transaction: ITransactionWithAccounts) {
  transactionsState.merge([transaction]);
}

export default transactionsState;

