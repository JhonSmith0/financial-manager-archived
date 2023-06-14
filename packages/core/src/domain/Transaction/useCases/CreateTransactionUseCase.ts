import AccountRepository from "@/domain/Account/types/AccountRepository";
import { CreateTransactionDTO } from "@/domain/Transaction/dto/CreateTransactionDTO";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepository } from "@/domain/Transaction/types/TransactionRepository";
import User from "@/domain/User/entity/User";

import { right } from "@/common/ErrorHandlingTypes";
import { TransactionUseCase } from "./TransactionUseCase";

interface Props {
  dto: ClassProperties<CreateTransactionDTO>;
  user: { id: User["id"] };
}

export class CreateTransactionUseCase extends TransactionUseCase {
  public async execute({ dto, user }: Props) {
    const acc = Transaction.create({ ...dto, userId: user.id });
    await this.transactionRepo.add(acc);
    return right(acc);
  }
}
