import { UseCase } from "@/common/UseCase";
import { SearchAccountDTO } from "../dto/SearchAccountDTO";
import AccountRepository from "../types/AccountRepository";
import User from "@/domain/User/entity/User";
import { right } from "@/common/ErrorHandlingTypes";

export interface SearchAccountUseCaseProps {
  dto: SearchAccountDTO;
  user: { id: User["id"] };
}

export class SearchAccountUseCase extends UseCase<SearchAccountUseCaseProps> {
  constructor(private repo: AccountRepository) {
    super();
  }

  private resultsPerPage = 60;

  public async execute({ dto, user }: SearchAccountUseCaseProps) {
    const results = await this.repo.findByQuery(
      {
        name: {
          startsWith: dto.name,
        },
        description: {
          startsWith: dto.description,
        },
        userId: {
          equals: user.id,
        },
      },
      (dto.page - 1) * this.resultsPerPage,
      dto.page * this.resultsPerPage
    );
    return right({ results, page: dto.page });
  }
}
