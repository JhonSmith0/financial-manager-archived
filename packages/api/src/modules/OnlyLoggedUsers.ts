import { Module } from "@nestjs/common"
import { GetMeController } from "../controllers/MeController"
import AuthModule from "./AuthModule"
import { TransactionModule } from "./TransactionModule"
import { UserModule } from "./UserModule"

@Module({
    controllers: [GetMeController],
    imports: [TransactionModule, AuthModule, UserModule],
})
export class OnlyLoggedUsers {}
