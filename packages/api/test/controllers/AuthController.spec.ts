import { configureApp } from "@/configureApp"
import AuthModule from "@/modules/AuthModule"
import { fakeUser } from "@financial/faker"
import { NestApplication } from "@nestjs/core"
import { Test } from "@nestjs/testing"
import { parse } from "cookie"
import supertest, { SuperTest } from "supertest"
describe("Auth controller", () => {
    let test: SuperTest<supertest.Test>
    let app: NestApplication

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AuthModule],
        }).compile()

        app = module.createNestApplication()
        test = supertest(app.getHttpServer())

        configureApp(app)

        await app.init()
    })

    const user = fakeUser()
    it("should register an user", async () => {
        const result = await test.post("/auth/register").send(user)

        expect(result.status).toBe(201)
        expect(
            typeof parse(result.headers["set-cookie"][0])?.authorization
        ).toBe("string")
    })
    it("should log in user", async () => {
        const result = await test.post("/auth/login").send(user)

        expect(result.status).toBe(200)
        expect(
            typeof parse(result.headers["set-cookie"][0])?.authorization
        ).toBe("string")
    })
})
