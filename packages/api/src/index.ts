import { NestFactory } from "@nestjs/core"
import RootModule from "./modules/RootModule"

export async function createApp() {
    return await NestFactory.create(RootModule)
}
