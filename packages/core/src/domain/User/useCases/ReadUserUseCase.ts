import { UseCase } from "@/common/UseCase"
import UserRepository from "../repo/UserRepository"
import { left, right } from "@/common/ErrorHandlingTypes"

export class ReadUserUseCase extends UseCase<string> {
    constructor(private repo: UserRepository) {
        super()
    }

    public async execute(id: string) {
        const user = await this.repo.db.findUnique({
            where: {
                id,
            },
        })

        return user ? right(user) : left(user)
    }
}
