import { ITransaction, TransactionCreate } from "@/interface";
import axios from "axios";

export async function newTransactionService(data: TransactionCreate) {
  return (await axios.post("/api/transaction", data)).data as ITransaction;
}
