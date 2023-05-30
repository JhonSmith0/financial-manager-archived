import Controller from "@/common/Controller";
import AccountRepository from "@/domain/Account/types/AccountRepository";
import User from "@/domain/User/entity/User";
import { right } from "fp-ts/lib/Either";

interface Props {
  user: { id: User["id"] };
  dto: {
    name: string;
  };
}

export class SearchAccountsController extends Controller<Props> {
  constructor(private repo: AccountRepository) {
    super();
  }

  public async handle(data: Props) {
    const found = await this.repo.findByUserIdAndName(
      data.user.id,
      data.dto.name
    );

    return found;
  }
}
