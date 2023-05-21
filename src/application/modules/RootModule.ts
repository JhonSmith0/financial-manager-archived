import { Module } from "@nestjs/common";
import RootController from "../controllers/RootController";

@Module({
  controllers: [RootController],
})
export default class RootModule {}
