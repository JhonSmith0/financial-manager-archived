import { left, right } from "@/common/ErrorHandlingTypes"
import { UseCase } from "@/common/UseCase"
import AlreadyExistsError from "@/common/errors/AlreadyExistsError"
import NotFoundError from "@/common/errors/NotFoundError"
import User from "@/domain/User/entity/User"
import UpdateAccountDTO from "../dto/UpdateAccountDTO"
import Account from "../entity"
import { AccountRepository } from "../repo/AccountRepository"

interface Props {
    dto: ClassProperties<UpdateAccountDTO> & Pick<Account, "id">
    user: { id: User["id"] }
}

export class UpdateAccountUseCase extends UseCase<Props> {
    constructor(private accountsRepo: AccountRepository) {
        super()
    }

    public async execute({ user, dto }: Props) {
        //Verify if account with that id exists
        const accountById = await this.accountsRepo.db.findUnique({
            where: {
                id: dto.id,
            },
        })

        if (!accountById)
            return left(
                new NotFoundError(`Account with id ${dto.id} not found!`, [
                    "id",
                ])
            )

        //Verify if account with that name already exists
        const exists = await this.accountsRepo.db.findFirst({
            where: {
                name: {
                    equals: dto.name,
                },
                userId: {
                    equals: user.id,
                },
                id: {
                    not: {
                        equals: dto.id,
                    },
                },
            },
        })

        if (exists)
            return left(
                new AlreadyExistsError("Account already exists!", ["name"])
            )

        console.log({ dto })

        const result = await this.accountsRepo.db.update({
            data: dto,
            where: {
                id: dto.id,
            },
        })
        console.log({ result })

        return right(Account.create(result))
    }
}
