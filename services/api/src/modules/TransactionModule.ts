import { TransactionsTokens } from "@libs/core/dist/domain/Transaction/di/TransactionTokens"
import { TransactionUseCasesFactory } from "@libs/core/dist/domain/Transaction/factory/TransactionUseCasesFactory"
import { TransactionRepository } from "@libs/core/dist/domain/Transaction/repo/TransactionRepository"
import { Module, Provider, forwardRef } from "@nestjs/common"
import { TransactionController } from "../controllers/TransactionController"
import { AccountModule } from "./AccountModule"

const providers: Provider[] = [
    {
        provide: TransactionsTokens.repository,
        inject: [],
        async useFactory() {
            const obj = new TransactionRepository()
            await obj.$connect()
            return obj
        },
    },
    {
        provide: TransactionUseCasesFactory,
        inject: [TransactionsTokens.repository],
        async useFactory(tRepo) {
            return new TransactionUseCasesFactory(tRepo)
        },
    },
]

@Module({
    controllers: [TransactionController],
    providers,
    exports: providers,
    imports: [forwardRef(() => AccountModule)],
})
export class TransactionModule {}
