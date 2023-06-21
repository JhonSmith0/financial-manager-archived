import { NestFactory } from "@nestjs/core"
import RootModule from "./modules/RootModule"
import { registerPaths } from "./registerPaths"

registerPaths()

export async function createApp() {
    return await NestFactory.create(RootModule)
}
