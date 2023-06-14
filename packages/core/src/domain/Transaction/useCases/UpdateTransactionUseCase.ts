import User from "@/domain/User/entity/User";
import { UpdateTransactionDTO } from "../dto/UpdateTransactionDTO";
import { TransactionUseCase } from "./TransactionUseCase";
import Account from "@/domain/Account/entity";
import { Transaction } from "../entity";
import { left, right } from "@/common/ErrorHandlingTypes";
import NotFoundError from "@/common/errors/NotFoundError";
import { linkProto } from "@/common/utils/linkProto";

interface Props {
  dto: UpdateTransactionDTO;
  transaction: { id: Transaction["id"] };
}

export class UpdateTransactionUseCase extends TransactionUseCase {
  public async execute(data: Props) {
    const transaction = await this.transactionRepo.findByQuery(
      { id: { equals: data.transaction.id } },
      0,
      1
    );
    if (!transaction)
      return left(new NotFoundError("Transaction not found", ["id"]));

    await this.transactionRepo.update(transaction.id, data.dto);
    return right(Transaction.create({ ...transaction, ...data.dto }));
  }
}
