import { RepositoryInMemory } from "@/common/repo/RepositoryInMemory";
import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import AccountProps from "@/domain/Account/types/AccountProps";
import AccountRepository from "@/domain/Account/types/AccountRepository";
import { TransactionProps } from "../types/TransactionProps";
import { TransactionRepository } from "../types/TransactionRepository";
import { TransactionWithAccounts } from "../types/TransactionWithAccounts";

export class TransactionRepositoryInMemory
    extends RepositoryInMemory<TransactionProps>
    implements TransactionRepository
{
    constructor(
        private accountsRepo: AccountRepository = new AccountRepositoryInMemory()
    ) {
        super();
    }

    public async readTransactionWithAccounts(
        id: string
    ): Promise<TransactionWithAccounts> {
        const transaction = (await this.read(id)) as TransactionProps;
        const fromAccount = (await this.accountsRepo.read(
            transaction.fromAccountId
        )) as AccountProps;
        const toAccount = (await this.accountsRepo.read(
            transaction.toAccountId
        )) as AccountProps;

        return ({
            ...transaction,
            fromAccount,
            toAccount,
        });
    }
}
