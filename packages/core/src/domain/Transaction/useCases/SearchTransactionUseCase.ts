import { UseCase } from "@/common/UseCase";
import { TransactionRepository } from "../types/TransactionRepository";
import { right } from "@/common/ErrorHandlingTypes";
import { SearchTransactionDTO } from "../dto/SearchTransactionDTO";
import User from "@/domain/User/entity/User";

interface Props {
  dto: SearchTransactionDTO;
  user: { id: User["id"] };
}

export class SearchTransactionUseCase extends UseCase<Props> {
  private perPage = 300;

  constructor(private repo: TransactionRepository) {
    super();
  }

  public async execute(data: Props) {
    const skip = (data.dto.page - 1) * this.perPage;
    const limit = this.perPage;

    return right({
      results: await this.repo.findByQuery(
        {
          userId: {
            equals: data.user.id,
          },
        },
        skip,
        limit
      ),
      page: data.dto.page,
    });
  }
}
