import Tokens from "@financial/core/dist/domain/Account/di/AccountTokens";
import { AccountRepositoryPrisma } from "@financial/core/dist/domain/Account/repo/AccountRepositoryPrisma";
import { AccountUseCases } from "@financial/core/dist/domain/Account/useCases/AccountUseCases";
import { Module, Provider, forwardRef } from "@nestjs/common";
import { AccountController } from "../controllers/AccountController";
import { TransactionModule } from "./TransactionModule";

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
    provide: AccountUseCases,
    inject: [Tokens.accountRepository],
    useFactory(repo) {
      return new AccountUseCases(repo);
    },
  },
];

@Module({
  controllers: [AccountController],
  providers,
  exports: providers,
  imports: [forwardRef(() => TransactionModule)],
})
export class AccountModule {}

