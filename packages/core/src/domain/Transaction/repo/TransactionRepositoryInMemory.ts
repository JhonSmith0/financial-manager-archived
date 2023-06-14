import { RepositoryInMemory } from "@/common/repo/RepositoryInMemory";
import { TransactionProps } from "../types/TransactionProps";
import { TransactionRepository } from "../types/TransactionRepository";

export class TransactionRepositoryInMemory
  extends RepositoryInMemory<TransactionProps>
  implements TransactionRepository {}
