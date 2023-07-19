import { DeleteAccountDTO } from "@/domain/Account/dto/DeleteAccountDTO"

describe("DeleteAccountDTO", () => {
    it("should test id prop", async () => {
        expect(
            await DeleteAccountDTO.create({} as any).validate()
        ).toHaveLength(1)
        expect(
            await DeleteAccountDTO.create({ id: {} } as any).validate()
        ).toHaveLength(1)
        expect(
            await DeleteAccountDTO.create({ id: "78967786" } as any).validate()
        ).toHaveLength(0)
    })
})
