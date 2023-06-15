import { TransactionCreate } from "@/interface";
import { newTransactionService } from "@/services/transaction";
import { addTransaction } from "@/state/transaction/transactionsState";
import { getTransactionsController } from ".";

export async function newTransactionController(data: TransactionCreate) {
  const result = await newTransactionService(data);
  await getTransactionsController({});
  return result;
}

