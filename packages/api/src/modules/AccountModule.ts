import { Module, Provider } from "@nestjs/common";
import Tokens from "@financial/core/dist/domain/Account/di/AccountTokens";
import { AccountRepositoryPrisma } from "@financial/core/dist/domain/Account/repo/AccountRepositoryPrisma";
import { AccountController } from "@/controllers/AccountController";
import CreateAccountUseCase from "@financial/core/dist/domain/Account/useCases/CreateAccountUseCase";
import { SearchAccountUseCase } from "@financial/core/dist/domain/Account/useCases/SearchAccountUseCase";

const providers: Provider[] = [
  {
    provide: Tokens.accountRepository,
    async useFactory() {
      const obj = new AccountRepositoryPrisma();
      await obj.$connect();
      return obj;
    },
  },
  {
    provide: CreateAccountUseCase,
    inject: [Tokens.accountRepository],
    async useFactory(repo) {
      return new CreateAccountUseCase(repo);
    },
  },
  {
    provide: SearchAccountUseCase,
    inject: [Tokens.accountRepository],
    async useFactory(repo) {
      return new SearchAccountUseCase(repo);
    },
  },
];

@Module({
  controllers: [AccountController],
  providers,
})
export class AccountModule {}
