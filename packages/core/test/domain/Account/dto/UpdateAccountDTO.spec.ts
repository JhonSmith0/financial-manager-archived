import UpdateAccountDTO from "@/domain/Account/dto/UpdateAccountDTO"

function removeProp<T>(obj: T, ...props: (keyof T)[]) {
    const copy = { ...obj }

    for (const key of props) {
        //@ts-ignore
        delete copy[key]
    }

    return copy
}

describe("UpdateAccountDTO", () => {
    const dataForTest: ClassProperties<UpdateAccountDTO> = {
        name: "Bank account",
        description: "testing",
        id: "lkjlfjljlkj",
    } as any

    it("should pass", async () => {
        const dto = UpdateAccountDTO.create(dataForTest)
        const errors = await dto.validate()

        expect(errors.length).toBe(0)
    })

    it("should remove extra props", () => {
        const dto = UpdateAccountDTO.create({
            ...dataForTest,
            extra: "hello",
        } as any)
        expect(dto).not.toHaveProperty("extra")
    })

    it("should test the name", async () => {
        const small = await UpdateAccountDTO.create({
            ...dataForTest,
            name: "123",
        }).validate()
        const long = await UpdateAccountDTO.create({
            ...dataForTest,
            name: "1".repeat(25),
        }).validate()
        const notString = await UpdateAccountDTO.create({
            ...dataForTest,
            name: {},
        } as any).validate()

        expect(small).toHaveLength(1)
        expect(long).toHaveLength(1)
        expect(notString).toHaveLength(1)
    })
    it("should test the description", async () => {
        const long = await UpdateAccountDTO.create({
            ...dataForTest,
            name: "1".repeat(129),
        }).validate()
        const notString = await UpdateAccountDTO.create({
            ...dataForTest,
            name: {},
        } as any).validate()

        expect(long).toHaveLength(1)
        expect(notString).toHaveLength(1)
    })
})
