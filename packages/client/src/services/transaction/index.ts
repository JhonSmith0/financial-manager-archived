import { TransactionCreate } from "@/interface";
import axios from "axios";

export async function createTransaction(data: TransactionCreate) {
  return (await axios.post("/api/transaction", data)).data;
}
