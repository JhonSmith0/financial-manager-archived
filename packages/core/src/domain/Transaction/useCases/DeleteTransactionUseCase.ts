import { left, right } from "@/common/ErrorHandlingTypes";
import NotFoundError from "@/common/errors/NotFoundError";
import { DeleteTransactionDTOProps } from "../dto/DeleteTransactionDTO";
import { TransactionUseCase } from "./TransactionUseCase";

interface Prop {
  dto: DeleteTransactionDTOProps;
}

export class DeleteTransactionUseCase extends TransactionUseCase {
  public async execute(data: Prop) {
    const transaction = await this.transactionRepo.findByQuery(
      {
        id: {
          equals: data.dto.id,
        },
      },
      undefined,
      1
    );

    if (!transaction)
      return left(new NotFoundError("Account not found!", ["id"]));

    await this.transactionRepo.deleteByQuery({
      id: { equals: transaction.id },
    } as any);

    return right(null);
  }
}
