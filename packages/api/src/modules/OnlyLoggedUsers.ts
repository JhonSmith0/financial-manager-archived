import { GetMeController } from "../controllers/MeController";
import { VerifyJWT } from "../middlewares/VerifyJWT";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

@Module({
  controllers: [GetMeController],
})
export class OnlyLoggedUsers implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes("/api/*");
  }
}
