import { ITransaction } from "@/interface";
import { hookstate } from "@hookstate/core";

const transactionsState = hookstate<ITransaction[]>([]);

export function addTransaction(transaction: ITransaction) {
  transactionsState.merge([transaction]);
}

export default transactionsState;
