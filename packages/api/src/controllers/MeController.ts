import MeController from "@financial/core/dist/controllers/auth/MeController"
import User from "@financial/core/dist/domain/User/entity/User"
import { Controller, Get, UseGuards } from "@nestjs/common"
import { AdaptErrors } from "../adapters/adaptErrors"
import { UserEntity } from "../decorators/UserEntity"
import { VerifyJWT } from "@/guards/VerifyJWT"

@UseGuards(VerifyJWT)
@Controller()
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
