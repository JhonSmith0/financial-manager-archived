import { TransactionController } from "@/controllers/TransactionController";
import { GetMeController } from "../controllers/MeController";
import { VerifyJWT } from "../middlewares/VerifyJWT";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TransactionsModule } from "./TransactionsModule";

@Module({
  controllers: [GetMeController],
  imports: [TransactionsModule],
})
export class OnlyLoggedUsers implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes("/api/*");
  }
}
