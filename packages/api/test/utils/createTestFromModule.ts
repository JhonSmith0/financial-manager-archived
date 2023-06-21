import { configureApp } from "@/configureApp"
import { ModuleMetadata } from "@nestjs/common"
import { Test } from "@nestjs/testing/test"
import supertest from "supertest"

export async function createTestFromModule(data: ModuleMetadata) {
    const module = await Test.createTestingModule(data).compile()

    const app = module.createNestApplication()
    const test = supertest(app.getHttpServer())

    configureApp(app)

    return { module, app, test }
}
