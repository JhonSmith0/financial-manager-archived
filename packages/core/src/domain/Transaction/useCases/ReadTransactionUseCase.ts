import { UseCase } from "@/common/UseCase";
import { TransactionRepository } from "../types/TransactionRepository";
import { left, right } from "@/common/ErrorHandlingTypes";
import NotFoundError from "@/common/errors/NotFoundError";
import { linkProto } from "@/common/utils/linkProto";
import { Transaction } from "../entity";

export default class ReadTransactionUseCase extends UseCase<string> {
  constructor(private repo: TransactionRepository) {
    super();
  }
  public async execute(id: string) {
    const transaction = await this.repo.read(id);
    if (!transaction)
      return left(new NotFoundError("Transaction not found", ["id"]));
    return right(Transaction.create(transaction));
  }
}
