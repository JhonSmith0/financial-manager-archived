import { AccountModule } from "@/modules/AccountModule"
import AuthModule from "@/modules/AuthModule"
import { TransactionModule } from "@/modules/TransactionModule"
import Account from "@financial/core/dist/domain/Account/entity"
import User from "@financial/core/dist/domain/User/entity/User"
import { fakeAccount, fakeTransaction, fakeUser } from "@financial/faker"
import { map } from "async"
import supertest, { SuperAgentTest } from "supertest"
import { createTestFromModule } from "../utils/createTestFromModule"

async function register(agent: SuperAgentTest) {
    const user = fakeUser()
    await agent.post("/auth/register").send(user)
    return user
}

describe("AccountController", () => {
    let agent: SuperAgentTest
    let user: User = fakeUser()
    beforeAll(async () => {
        const { app } = await createTestFromModule({
            imports: [AccountModule, AuthModule, TransactionModule],
        })

        agent = supertest.agent(app.getHttpServer())

        await agent.post("/auth/register").send(user)
    })

    it("should create an account", async () => {
        let account: Account = fakeAccount(user)

        const result = await agent.post("/account").send(account)
        const body = result.body as Account

        delete body["id"]
        delete body["userId"]

        expect(result.status).toBe(201)
        expect(account).toMatchObject(body)
    })

    it("should read an account", async () => {
        let account = fakeAccount(user)
        ;({ body: account } = await agent.post("/account").send(account))

        const result = await agent.get(`/account/${account.id}`)

        expect(result.status).toBe(200)
        expect(account).toMatchObject(result.body)
    })

    it("should update an account", async () => {
        let account = fakeAccount(user)
        ;({ body: account } = await agent.post("/account").send(account))

        const result = await agent
            .patch(`/account/${account.id}`)
            .send({ name: "test name" })

        expect(result.status).toBe(200)
        expect(result.body.name).toBe("test name")
    })

    it("should remove an account", async () => {
        let account = fakeAccount(user)
        ;({ body: account } = await agent.post("/account").send(account))

        await agent.delete(`/account/${account.id}`)
        const result = await agent.get(`/account/${account.id}`)

        expect(result.status).toBe(404)
    })

    it("should give account balance", async () => {
        let from = fakeAccount(user)
        let to = fakeAccount(user)
        ;({ body: from } = await agent.post("/account").send(from))
        ;({ body: to } = await agent.post("/account").send(to))

        const trs = Array.from({ length: 10 }, () =>
            fakeTransaction(user, from, to)
        )
        const amount = trs.reduce((acc, val) => acc + val.amount, 0)

        await map(trs, async (tr) => await agent.post("/transaction").send(tr))

        const result = await agent.get(`/account/${to.id}/balance`)

        expect(result.status).toBe(200)
        expect(+result.text).toBe(amount)
    })

    it("should return account transactions", async () => {
        let from = fakeAccount(user)
        let to = fakeAccount(user)
        ;({ body: from } = await agent.post("/account").send(from))
        ;({ body: to } = await agent.post("/account").send(to))

        const trs = Array.from({ length: 10 }, () =>
            fakeTransaction(user, from, to)
        )
        const amount = trs.reduce((acc, val) => acc + val.amount, 0)

        await map(trs, async (tr) => await agent.post("/transaction").send(tr))

        const result = await agent.get(`/account/${to.id}/transactions`)

        const transactions = result.body

        expect(result.status).toBe(200)
        expect(transactions).toHaveLength(trs.length)
    })

    it("should search accounts", async () => {
        let result: supertest.Response
        let accountsBody: Account[]

        const user = await register(agent)
        const accounts = Array.from({ length: 5 }, (_, i) => {
            const acc = fakeAccount(user)
            acc.name = "account number " + i
            return acc
        })

        await map(
            accounts,
            async (account) => await agent.post("/account").send(account)
        )

        result = await agent.get(`/account/search`).query({
            name: "",
        })

        accountsBody = result.body.results

        expect(result.status).toBe(200)
        expect(accountsBody).toHaveLength(accounts.length)

        // result = await agent.get(`/account/search`).query({
        //     name: accounts[3].name,
        // })

        // accountsBody = result.body.results

        // expect(result.status).toBe(200)
        // expect(accountsBody).toHaveLength(1)
    })
})
