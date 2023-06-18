import { right } from "@/common/ErrorHandlingTypes"
import { UseCase } from "@/common/UseCase"
import User from "@/domain/User/entity/User"
import { SearchAccountDTO } from "../dto/SearchAccountDTO"
import Account from "../entity"
import { AccountRepository } from "../repo/AccountRepository"

export interface SearchAccountUseCaseProps {
    dto: SearchAccountDTO
    user: { id: User["id"] }
}

export class SearchAccountUseCase extends UseCase<SearchAccountUseCaseProps> {
    constructor(private repo: AccountRepository) {
        super()
    }

    private resultsPerPage = 60

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
        })) as Account[]

        return right({ results })
    }
}
