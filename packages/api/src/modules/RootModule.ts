import { Global, Module, Provider } from "@nestjs/common";

import { ServeStaticModule } from "@nestjs/serve-static";
import { dirname } from "path";

import JWT from "@financial/core/dist/common/JWT/JWT";
import LoginController from "@financial/core/dist/controllers/auth/LoginController";
import MeController from "@financial/core/dist/controllers/auth/MeController";
import RegisterController from "@financial/core/dist/controllers/auth/RegisterController";
import UserToken from "@financial/core/dist/domain/User/di/UserTokens";
import UserRepositoryPrisma from "@financial/core/dist/domain/User/repo/UserRepositoryPrisma";
import CreateUserUseCase from "@financial/core/dist/domain/User/useCases/CreateUserUseCase";
import { RouterModule } from "@nestjs/core";
import AuthModule from "./AuthModule";
import { OnlyLoggedUsers } from "./OnlyLoggedUsers";

const htmlPath = require.resolve("@financial/client/lib/index.html");
const libPath = dirname(htmlPath);

const providers: Provider[] = [
  {
    provide: UserToken.userRepository,
    async useFactory() {
      const repo = new UserRepositoryPrisma();
      await repo.$connect();
      return repo;
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
@Global()
@Module({
  imports: [
    RouterModule.register([
      {
        path: "api",
        module: OnlyLoggedUsers,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: libPath,
    }),
    AuthModule,
    OnlyLoggedUsers,
  ],
  providers,
  exports: providers,
})
export default class RootModule {}
