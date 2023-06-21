import JWT from "@financial/core/dist/common/JWT/JWT"
import LoginController from "@financial/core/dist/controllers/auth/LoginController"
import MeController from "@financial/core/dist/controllers/auth/MeController"
import RegisterController from "@financial/core/dist/controllers/auth/RegisterController"
import UserToken from "@financial/core/dist/domain/User/di/UserTokens"
import CreateUserUseCase from "@financial/core/dist/domain/User/useCases/CreateUserUseCase"
import { Module, Provider } from "@nestjs/common"
import AuthController from "../controllers/AuthController"
import { UserModule } from "./UserModule"

const providers: Provider[] = [
    {
        provide: LoginController,
        inject: [UserToken.userRepository, JWT],
        useFactory(repo, jwt) {
            return new LoginController(repo, jwt)
        },
    },
    {
        provide: JWT,
        useValue: new JWT("123"),
    },
    {
        provide: RegisterController,
        inject: [CreateUserUseCase, JWT],
        useFactory(useCase, jwt) {
            return new RegisterController(useCase, jwt)
        },
    },
    {
        provide: MeController,
        inject: [UserToken.userRepository, JWT],
        useFactory(repo, jwt) {
            return new MeController(repo, jwt)
        },
    },
]

@Module({
    controllers: [AuthController],
    providers,
    exports: providers,
    imports: [UserModule],
})
export default class AuthModule {}
