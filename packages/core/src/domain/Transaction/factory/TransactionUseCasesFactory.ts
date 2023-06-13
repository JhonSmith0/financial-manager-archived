import AccountRepository from "@/domain/Account/types/AccountRepository";
import { TransactionRepository } from "../types/TransactionRepository";
import { CreateTransactionUseCase } from "../useCases/CreateTransactionUseCase";

export class TransactionUseCasesFactory {
  constructor(
    private tRepo: TransactionRepository,
    private aRepo: AccountRepository
  ) {}

  public create = new CreateTransactionUseCase(this.tRepo, this.aRepo);
}
