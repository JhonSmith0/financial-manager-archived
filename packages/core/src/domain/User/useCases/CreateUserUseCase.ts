import { left, right } from "@/common/ErrorHandlingTypes"
import CreateUserDTO from "../dto/CreateUserDTO"
import User from "../entity/User"
import GenericError from "@/common/errors/GenericError"
import UserRepository from "../repo/UserRepository"

export default class CreateUserUseCase {
    constructor(private repo: UserRepository) {}

    public async execute(data: ClassProperties<CreateUserDTO>) {
        // Already exists
        const exists = await this.repo.db.findUnique({
            where: {
                email: data.email,
            },
        })
        if (exists)
            return left(new GenericError("This email is already in use!", 409))

        const user = User.create(data)

        await user.cryptPassword()

        await this.repo.db.create({ data: user })
        return right(user)
    }
}
