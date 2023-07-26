import AuthModule from "@/modules/AuthModule"
import { fakeUser } from "@financial/faker"
import { INestApplication } from "@nestjs/common"
import { parse } from "cookie"
import supertest, { SuperTest } from "supertest"
import { createTestFromModule } from "../utils/createTestFromModule"
describe("Auth controller", () => {
    let test: SuperTest<supertest.Test>
    let app: INestApplication

    beforeAll(async () => {
        ;({ app, test } = await createTestFromModule({ imports: [AuthModule] }))
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