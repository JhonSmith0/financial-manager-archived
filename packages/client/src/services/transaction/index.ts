import { ITransaction, GetTransactions, TransactionCreate } from "@/interface";
import api from "../http";

export async function newTransactionService(data: TransactionCreate) {
  return (await api.post("/api/transaction", data)).data as ITransaction;
}
export async function getTransactionService(data: GetTransactions) {
  return (await api.get("/api/transaction/search", { params: data })).data as {
    results: ITransaction[];
  };
}
