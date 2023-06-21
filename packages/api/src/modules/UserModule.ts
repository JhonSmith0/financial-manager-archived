import UserToken from "@financial/core/dist/domain/User/di/UserTokens"
import UserRepository from "@financial/core/dist/domain/User/repo/UserRepository"
import CreateUserUseCase from "@financial/core/dist/domain/User/useCases/CreateUserUseCase"
import { Module, Provider } from "@nestjs/common"

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
        provide: CreateUserUseCase,
        inject: [UserToken.userRepository],
        useFactory(repo) {
            return new CreateUserUseCase(repo)
        },
    },
]

@Module({
    providers,
    exports: providers,
})
export class UserModule {}
