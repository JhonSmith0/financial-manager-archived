import AccountRepository from "@/domain/Account/types/AccountRepository";
import { TransactionRepository } from "../types/TransactionRepository";
import { CreateTransactionUseCase } from "../useCases/CreateTransactionUseCase";
import { SearchTransactionUseCase } from "../useCases/SearchTransactionUseCase";
import { DeleteAllTransactions } from "../useCases/DeleteAllTransactions";

export class TransactionUseCasesFactory {
  constructor(
    private tRepo: TransactionRepository,
    private aRepo: AccountRepository
  ) {}

  public create = new CreateTransactionUseCase(this.tRepo, this.aRepo);
  public search = new SearchTransactionUseCase(this.tRepo);
  public removeAll = new DeleteAllTransactions(this.tRepo);
}
