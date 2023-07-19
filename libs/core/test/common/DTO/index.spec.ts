import DTO from "@/common/DTO/DTO"
import { Transformer } from "@/common/Transformer"
import { Expose } from "class-transformer"

class Test extends DTO {
    @Expose()
    public prop: string
    constructor(data: ClassProperties<Test>) {
        super()
        Transformer.assignPlainToInstance(Test, data, this)
    }
}

describe("DTO tests", () => {
    const obj = new Test({
        prop: "123456",
        prop2: "123456",
    } as any)

    it("should pass", () => {
        expect(obj).toHaveProperty("prop")
        expect(obj).not.toHaveProperty("prop2")
    })
})
