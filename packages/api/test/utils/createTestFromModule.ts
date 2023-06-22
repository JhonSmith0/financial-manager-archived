import { configureApp } from "@/configureApp"
import { ModuleMetadata } from "@nestjs/common"
import { Test } from "@nestjs/testing/test"
import supertest from "supertest"

export async function createTestFromModule(data: ModuleMetadata, init = true) {
    const module = await Test.createTestingModule(data).compile()

    const app = module.createNestApplication()
    const test = supertest(app.getHttpServer())

    configureApp(app)

    init && (await app.init())

    return { module, app, test }
}
