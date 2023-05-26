import { Module, Provider } from "@nestjs/common";
import AuthController from "../controllers/AuthController";

import UserToken from "@financial/core/dist/domain/User/di/UserTokens";

import JWT from "@financial/core/dist/common/JWT/JWT";
import LoginController from "@financial/core/dist/controllers/auth/LoginController";
import RegisterController from "@financial/core/dist/controllers/auth/RegisterController";
import UserRepositoryInMemory from "@financial/core/dist/domain/User/repo/UserRepositoryInMemory";
import CreateUserUseCase from "@financial/core/dist/domain/User/useCases/CreateUserUseCase";
import MeController from "@financial/core/dist/controllers/auth/MeController";

const providers: Provider[] = [
  {
    provide: UserToken.userRepository,
    useValue: new UserRepositoryInMemory(),
  },
  {
    provide: JWT,
    useValue: new JWT("123"),
  },
  {
    provide: LoginController,
    inject: [UserToken.userRepository, JWT],
    useFactory(repo, jwt) {
      return new LoginController(repo, jwt);
    },
  },
  {
    provide: RegisterController,
    inject: [CreateUserUseCase, JWT],
    useFactory(useCase, jwt) {
      return new RegisterController(useCase, jwt);
    },
  },
  {
    provide: CreateUserUseCase,
    inject: [UserToken.userRepository],
    useFactory(repo) {
      return new CreateUserUseCase(repo);
    },
  },
  {
    provide: MeController,
    inject: [UserToken.userRepository, JWT],
    useFactory(repo, jwt) {
      return new MeController(repo, jwt);
    },
  },
];

@Module({
  controllers: [AuthController],
  providers,
  exports: providers,
})
export default class AuthModule {}
