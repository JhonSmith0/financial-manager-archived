import AccountRepository from "@/domain/Account/types/AccountRepository";
import { TransactionRepository } from "../types/TransactionRepository";

export abstract class TransactionUseCase {
  constructor(
    protected transactionRepo: TransactionRepository,
    protected accountRepo: AccountRepository
  ) {}
  protected async isAccountsOwner(ids: string[], userId: string) {
    const [acc1, acc2] = await Promise.all(
      ids.map((each) =>
        this.accountRepo.findByQuery({
          id: {
            equals: each,
          },
          userId: {
            equals: userId,
          },
        })
      )
    );

    return acc1 && acc2;
  }
}
