import { TransactionRepository } from "../types/TransactionRepository";

export abstract class TransactionUseCase {
  constructor(protected transactionRepo: TransactionRepository) {}
}
