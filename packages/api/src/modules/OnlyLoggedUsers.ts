import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { GetMeController } from "../controllers/MeController"
import { VerifyJWT } from "../middlewares/VerifyJWT"
import AuthModule from "./AuthModule"
import { TransactionModule } from "./TransactionModule"
import { UserModule } from "./UserModule"

@Module({
    controllers: [GetMeController],
    imports: [TransactionModule, AuthModule, UserModule],
})
export class OnlyLoggedUsers implements NestModule {
    constructor() {}

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(VerifyJWT).forRoutes("/api/*")
    }
}
