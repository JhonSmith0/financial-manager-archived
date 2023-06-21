import CreateAccountDTO from "@/domain/Account/dto/CreateAccountDTO"

describe("CreateAccountDTO", () => {
    const data = {
        description: "Hello!",
        name: "Bank Account",
        userId: "89127987898947897",
    }

    const dto = CreateAccountDTO.create(data)

    it("should be created", () => {
        expect(dto).toBeInstanceOf(CreateAccountDTO)
    })

    it("should pass on validation", async () => {
        expect(await dto.validate()).toHaveLength(0)
    })

    it("should fail", async () => {
        const nameTest = CreateAccountDTO.create(dto)

        nameTest.name = "123"
        expect(await nameTest.validate()).toHaveLength(1)

        nameTest.name = "1".repeat(25)
        expect(await nameTest.validate()).toHaveLength(1)

        const descTest = CreateAccountDTO.create(dto)

        descTest.description = "1".repeat(129)
        expect(await descTest.validate()).toHaveLength(1)
    })
})
