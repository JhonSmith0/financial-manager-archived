import { configureApp } from "@/configureApp"
import AuthModule from "@/modules/AuthModule"
import { NestApplication } from "@nestjs/core"
import { Test } from "@nestjs/testing"
import supertest, { SuperTest } from "supertest"

describe("Auth controller", () => {
    let test: SuperTest<supertest.Test>
    let app: NestApplication

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AuthModule],
        }).compile()

        app = module.createNestApplication()
        test = supertest(app)

        configureApp(app)

        await app.init()
    })

    it("shuold pass", async () => {
        const req = await test.post("/auth/login").send({
            email: "user@email.com",
            password: "12345678",
        })
    })
})
