import { TransactionRepository } from "../repo/TransactionRepository"

export abstract class TransactionUseCase {
    constructor(protected transactionRepo: TransactionRepository) {}
}
