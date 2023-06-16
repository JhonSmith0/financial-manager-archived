import { UseCase } from "@/common/UseCase";
import { SearchAccountDTO } from "../dto/SearchAccountDTO";
import User from "@/domain/User/entity/User";
import { right } from "@/common/ErrorHandlingTypes";
import { AccountRepository } from "../repo/AccountRepository";
import Account from "../entity";

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
		const results = (await this.repo.db.findMany({
			where: {
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
		})) as Account[];

		return right({ results, page: dto.page });
	}
}
