import { left, right } from "fp-ts/Either";
import CreateAccountDTO from "../dto/CreateAccountDTO";
import Account from "../entity";
import AccountRepository from "../types/AccountRepository";
import AlreadyExistsError from "@/common/errors/AlreadyExistsError";

export default class CreateAccountUseCase {
  constructor(private repo: AccountRepository) {}

  public async exec(data: CreateAccountDTO) {
    const account = Account.create(data);
    if (await this.repo.exists(account))
      return left(new AlreadyExistsError("Account already exists!", ["name"]));

    await this.repo.add(account);
    return right(account);
  }
}
