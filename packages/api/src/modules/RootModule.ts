import { Global, Module, Provider } from "@nestjs/common"

import JWT from "@financial/core/dist/common/JWT/JWT"
import LoginController from "@financial/core/dist/controllers/auth/LoginController"
import MeController from "@financial/core/dist/controllers/auth/MeController"
import RegisterController from "@financial/core/dist/controllers/auth/RegisterController"
import UserToken from "@financial/core/dist/domain/User/di/UserTokens"

import CreateUserUseCase from "@financial/core/dist/domain/User/useCases/CreateUserUseCase"
import { RouterModule } from "@nestjs/core"
import { AccountModule } from "./AccountModule"
import AuthModule from "./AuthModule"
import { OnlyLoggedUsers } from "./OnlyLoggedUsers"
import { TransactionModule } from "./TransactionModule"
import UserRepository from "@financial/core/dist/domain/User/repo/UserRepository"

const providers: Provider[] = [
    {
        provide: UserToken.userRepository,
        async useFactory() {
            const repo = new UserRepository()
            await repo.$connect()
            return repo
        },
    },
    {
        provide: JWT,
        useValue: new JWT("123"),
    },
    {
        provide: LoginController,
        inject: [UserToken.userRepository, JWT],
        useFactory(repo, jwt) {
            return new LoginController(repo, jwt)
        },
    },
    {
        provide: RegisterController,
        inject: [CreateUserUseCase, JWT],
        useFactory(useCase, jwt) {
            return new RegisterController(useCase, jwt)
        },
    },
    {
        provide: CreateUserUseCase,
        inject: [UserToken.userRepository],
        useFactory(repo) {
            return new CreateUserUseCase(repo)
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
@Global()
@Module({
    imports: [
        RouterModule.register([
            {
                path: "api",
                module: OnlyLoggedUsers,
                children: [AccountModule, TransactionModule],
            },
        ]),

        AuthModule,
        OnlyLoggedUsers,
        AccountModule,
    ],
    providers,
    exports: providers,
})
export default class RootModule {}
