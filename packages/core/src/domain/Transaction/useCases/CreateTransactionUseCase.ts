import { UseCase } from "@/common/UseCase";
import NotFoundError from "@/common/errors/NotFoundError";
import AccountRepository from "@/domain/Account/types/AccountRepository";
import { CreateTransactionDTO } from "@/domain/Transaction/dto/CreateTransactionDTO";
import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepository } from "@/domain/Transaction/types/TransactionRepository";
import User from "@/domain/User/entity/User";
import { left, right } from "fp-ts/lib/Either";
import { TransactionUseCase } from "./TransactionUseCase";

interface Props {
  dto: ClassProperties<CreateTransactionDTO>;
  user: { id: User["id"] };
}

export class CreateTransactionUseCase extends TransactionUseCase {
  constructor(
    transactionRepo: TransactionRepository,
    accountRepo: AccountRepository
  ) {
    super(transactionRepo, accountRepo);
  }

  public async execute({ dto, user }: Props) {
    const isOwner = await this.isAccountsOwner(
      [dto.fromAccountId, dto.toAccountId],
      user.id
    );

    if (!isOwner)
      return left(
        new NotFoundError("Account not found!", [
          "fromAccountId",
          "toAccountId",
        ])
      );

    const acc = Transaction.create(dto);
    await this.transactionRepo.add(acc);
    return right(acc);
  }
}
