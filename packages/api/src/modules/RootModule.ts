import { Module, Provider } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { dirname } from 'path';
import AuthController from '../controllers/AuthController';
import UserToken from '@financial/core/dist/domain/User/di/UserTokens';

import UserRepositoryInMemory from '@financial/core/dist/domain/User/repo/UserRepositoryInMemory';
import LoginController from '@financial/core/dist/controllers/auth/LoginController';
import RegisterController from '@financial/core/dist/controllers/auth/RegisterController';
import JWT from '@financial/core/dist/common/JWT/JWT';
import CreateUserUseCase from '@financial/core/dist/domain/User/useCases/CreateUserUseCase';

const htmlPath = require.resolve('@financial/client/lib/index.html');
const libPath = dirname(htmlPath);

const providers: Provider[] = [
  {
    provide: UserToken.userRepository,
    useValue: new UserRepositoryInMemory(),
  },
  {
    provide: JWT,
    useValue: new JWT('123'),
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
];

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: libPath,
    }),
  ],
  controllers: [AuthController],
  providers: [...providers],
})
export default class RootModule {}
