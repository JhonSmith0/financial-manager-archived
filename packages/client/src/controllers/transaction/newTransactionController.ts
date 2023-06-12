import { TransactionCreate } from "@/interface";
import { newTransactionService } from "@/services/transaction";
import { addTransaction } from "@/state/transaction/transactionsState";

export async function newTransactionController(data: TransactionCreate) {
  const result = await newTransactionService(data);
  addTransaction(result);
  return result;
}
