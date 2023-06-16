import { left, right } from "@/common/ErrorHandlingTypes";
import { UseCase } from "@/common/UseCase";
import AccountRepository from "../types/AccountRepository";
import NotFoundError from "@/common/errors/NotFoundError";

interface Props {
  accountId: string;
}

export class ReadAccountUseCase extends UseCase<Props> {
  constructor(private repo: AccountRepository) {
    super();
  }

  public async execute(data: Props) {
    const acc = await this.repo.findByQuery({
      id: {
        equals: data.accountId,
      },
    });

    if (!acc) return left(new NotFoundError("Account not found!", ["id"]));

    return right(acc);
  }
}
