
import { GetMeController } from "../controllers/MeController";
import { VerifyJWT } from "../middlewares/VerifyJWT";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import {  TransactionModule } from "./TransactionModule";

@Module({
  controllers: [GetMeController],
  imports: [TransactionModule],
})
export class OnlyLoggedUsers implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes("/api/*");
  }
}
