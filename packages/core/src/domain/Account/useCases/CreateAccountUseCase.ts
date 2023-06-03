import AlreadyExistsError from "@/common/errors/AlreadyExistsError";
import { left, right } from "fp-ts/Either";
import Account from "../entity";
import AccountProps from "../types/AccountProps";
import AccountRepository from "../types/AccountRepository";

export default class CreateAccountUseCase {
  constructor(private repo: AccountRepository) {}

  public async exec(data: OptionalProps<AccountProps, "id">) {
    const account = Account.create(data);

    console.log({ account });

    if (await this.repo.exists(account))
      return left(new AlreadyExistsError("Account already exists!", ["name"]));

    await this.repo.add(account);
    return right(account);
  }
}
