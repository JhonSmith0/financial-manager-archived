import { TransactionRepository } from "../repo/TransactionRepository"

import { CreateTransactionUseCase } from "../useCases/CreateTransactionUseCase"
import { DeleteAccountTransactions } from "../useCases/DeleteAccountTransactions"
import { DeleteTransactionUseCase } from "../useCases/DeleteTransactionUseCase"
import { ReadAccountTransactionsUseCase } from "../useCases/ReadAccountTransactions"
import ReadTransactionUseCase from "../useCases/ReadTransactionUseCase"
import { SearchTransactionUseCase } from "../useCases/SearchTransactionUseCase"
import { UpdateTransactionUseCase } from "../useCases/UpdateTransactionUseCase"

export class TransactionUseCasesFactory {
    constructor(private tRepo: TransactionRepository) {}

    public create = new CreateTransactionUseCase(this.tRepo)
    public search = new SearchTransactionUseCase(this.tRepo)
    public removeAll = new DeleteAccountTransactions(this.tRepo)
    public read = new ReadTransactionUseCase(this.tRepo)
    public update = new UpdateTransactionUseCase(this.tRepo)
    public remove = new DeleteTransactionUseCase(this.tRepo)
    public accountTransactions = new ReadAccountTransactionsUseCase(this.tRepo)
}
