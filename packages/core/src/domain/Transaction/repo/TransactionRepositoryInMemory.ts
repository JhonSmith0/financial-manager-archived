import { Query } from "@/common/Query";
import { RepositoryInMemory } from "@/common/repo/RepositoryInMemory";
import { handleQuery } from "@/common/repo/handleQuery";
import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import AccountProps from "@/domain/Account/types/AccountProps";
import AccountRepository from "@/domain/Account/types/AccountRepository";
import { TransactionProps } from "../types/TransactionProps";
import { TransactionRepository } from "../types/TransactionRepository";
import { TransactionWithAccountsProps } from "../types/TransactionWithAccountsProps";

export class TransactionRepositoryInMemory
  extends RepositoryInMemory<TransactionProps>
  implements TransactionRepository
{
  constructor(
    private accountsRepo: AccountRepository = new AccountRepositoryInMemory()
  ) {
    super();
  }
  public async search(
    query: Query<TransactionProps>,
    skip: number = 0,
    limit: number = 100
  ): Promise<TransactionWithAccountsProps[]> {
    const transactions = handleQuery(query, this.data, skip, limit);
    return await Promise.all(
      transactions.map(
        async (each: TransactionProps) =>
          ({
            ...each,
            fromAccount: await this.accountsRepo.read(each.fromAccountId),
            toAccount: await this.accountsRepo.read(each.toAccountId),
          } as TransactionWithAccountsProps)
      )
    );
  }

  public async readTransactionWithAccounts(
    id: string
  ): Promise<TransactionWithAccountsProps | void> {
    const transaction = (await this.read(id)) as TransactionProps;
    if (!transaction) return;

    const fromAccount = (await this.accountsRepo.read(
      transaction.fromAccountId
    )) as AccountProps;
    const toAccount = (await this.accountsRepo.read(
      transaction.toAccountId
    )) as AccountProps;

    if (!fromAccount || !toAccount) return;

    return {
      ...transaction,
      fromAccount,
      toAccount,
    };
  }
}

