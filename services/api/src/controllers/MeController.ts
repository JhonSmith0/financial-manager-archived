import MeController from "@libs/core/dist/controllers/auth/MeController"
import User from "@libs/core/dist/domain/User/entity/User"
import { Controller, Get } from "@nestjs/common"
import { AdaptErrors } from "../adapters/adaptErrors"
import { UserEntity } from "../decorators/UserEntity"

@Controller("")
export class GetMeController {
    constructor(private meController: MeController) {}

    @Get("me")
    async me(
        @UserEntity()
        user: User
    ) {
        return user
    }
}
