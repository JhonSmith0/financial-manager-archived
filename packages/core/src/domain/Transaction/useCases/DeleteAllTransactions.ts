import { UseCase } from "@/common/UseCase";
import { TransactionRepository } from "../types/TransactionRepository";
import { Query } from "@/common/Query";
import { Transaction } from "../entity";
import { right } from "@/common/ErrorHandlingTypes";

interface Props extends Query<Transaction> {}

export class DeleteAllTransactions extends UseCase<Props> {
  constructor(private repo: TransactionRepository) {
    super();
  }

  public async execute(data: Props) {
    await this.repo.deleteByQuery(data);
    return right(null);
  }
}
