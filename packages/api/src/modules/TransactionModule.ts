import { TransactionUseCasesFactory } from "@financial/core/dist/domain/Transaction/factory/TransactionUseCasesFactory";
import { TransactionsTokens } from "@financial/core/dist/domain/Transaction/di/TransactionTokens";
import { TransactionRepositoryPrisma } from "@financial/core/dist/domain/Transaction/repo/TransactionRepositoryPrisma";
import AccountTokens from "@financial/core/dist/domain/Account/di/AccountTokens";
import { Module, Provider, forwardRef } from "@nestjs/common";
import { TransactionController } from "../controllers/TransactionController";
import { AccountModule } from "./AccountModule";

const providers: Provider[] = [
  {
    provide: TransactionsTokens.repository,
    inject: [],
    async useFactory() {
      const obj = new TransactionRepositoryPrisma();
      await obj.$connect();
      return obj;
    },
  },
  {
    provide: TransactionUseCasesFactory,
    inject: [TransactionsTokens.repository],
    async useFactory(tRepo) {
      return new TransactionUseCasesFactory(tRepo);
    },
  },
];

@Module({
  controllers: [TransactionController],
  providers,
  exports: providers,
  imports: [forwardRef(() => AccountModule)],
})
export class TransactionModule {}
