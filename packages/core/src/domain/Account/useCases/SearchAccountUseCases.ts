import { UseCase } from "@/common/UseCase";
import { SearchAccountDTO } from "../dto/SearchAccountDTO";
import AccountRepository from "../types/AccountRepository";
import User from "@/domain/User/entity/User";

export interface SearchAccountUseCaseProps {
  dto: SearchAccountDTO;
  user: { id: User["id"] };
}

export class SearchAccountUseCase extends UseCase<SearchAccountUseCaseProps> {
  constructor(private repo: AccountRepository) {
    super();
  }

  public async execute({ dto, user }: SearchAccountUseCaseProps) {
    const result = await this.repo.findByQuery(
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
      0,
      10
    );
    return result;
  }
}
