import { UseCase } from "@/common/UseCase";
import { CreateTransactionDTO } from "@/domain/Transaction/dto/CreateTransactionDTO";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepository } from "@/domain/Transaction/types/TransactionRepository";
import { right } from "fp-ts/lib/Either";

interface Props {
  dto: ClassProperties<CreateTransactionDTO>;
}

export class CreateTransactionUseCase extends UseCase<Props> {
  constructor(private repo: TransactionRepository) {
    super();
  }

  public async execute(data: Props) {
    const acc = Transaction.create(data.dto);
    await this.repo.add(acc);
    return right(acc);
  }
}
