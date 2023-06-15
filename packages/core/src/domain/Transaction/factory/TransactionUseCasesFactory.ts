import AccountRepository from "@/domain/Account/types/AccountRepository";
import { TransactionRepository } from "../types/TransactionRepository";
import { CreateTransactionUseCase } from "../useCases/CreateTransactionUseCase";
import { SearchTransactionUseCase } from "../useCases/SearchTransactionUseCase";
import { DeleteAllTransactions } from "../useCases/DeleteAllTransactions";
import ReadTransactionUseCase from "../useCases/ReadTransactionUseCase";
import { UpdateTransactionUseCase } from "../useCases/UpdateTransactionUseCase";
import { DeleteTransactionUseCase } from "../useCases/DeleteTransactionUseCase";

export class TransactionUseCasesFactory {
  constructor(private tRepo: TransactionRepository) {}

  public create = new CreateTransactionUseCase(this.tRepo);
  public search = new SearchTransactionUseCase(this.tRepo);
  public removeAll = new DeleteAllTransactions(this.tRepo);
  public read = new ReadTransactionUseCase(this.tRepo);
  public update = new UpdateTransactionUseCase(this.tRepo);
  public remove = new DeleteTransactionUseCase(this.tRepo);
}
