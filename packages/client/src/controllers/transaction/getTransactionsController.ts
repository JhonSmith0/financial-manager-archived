import { GetTransactions } from "@/interface";
import { getTransactionService } from "@/services/transaction";
import transactionsState from "@/state/transaction/transactionsState";

export async function getTransactionsController(data: GetTransactions) {
	const result = await getTransactionService(data);
	transactionsState.set(result.results);
	return result;
}

