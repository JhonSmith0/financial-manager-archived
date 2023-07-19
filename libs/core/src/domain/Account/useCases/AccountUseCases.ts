import { AccountRepository } from "../repo/AccountRepository"
import { AccountBalanceUseCase } from "./AccountBalanceUseCase"
import { AccountOwnerUseCase } from "./AccountOwnerUseCase"
import CreateAccountUseCase from "./CreateAccountUseCase"
import { DeleteAccountUseCase } from "./DeleteAccountUseCase"
import { ReadAccountUseCase } from "./ReadAccountUseCase.1"
import { SearchAccountUseCase } from "./SearchAccountUseCase"
import { UpdateAccountUseCase } from "./UpdateAccountUseCase"

export class AccountUseCases {
    constructor(private repo: AccountRepository) {}

    public create = new CreateAccountUseCase(this.repo)
    public read = new ReadAccountUseCase(this.repo)
    public update = new UpdateAccountUseCase(this.repo)
    public remove = new DeleteAccountUseCase(this.repo)
    public search = new SearchAccountUseCase(this.repo)
    public balance = new AccountBalanceUseCase(this.repo)
    public accountOwner = new AccountOwnerUseCase(this.repo)
}
