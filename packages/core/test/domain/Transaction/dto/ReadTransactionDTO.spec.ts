import { ReadTransactionDTO } from "@/domain/Transaction/dto/ReadTransactionDTO";

describe("ReadTransactionDTO", () => {
  it("should pass", async () => {
    const obj = new ReadTransactionDTO({
      id: "123",
    });

    const validation = await obj.validate();

    expect(validation).toHaveLength(0);
  });
  it("should not pass", async () => {
    const obj = new ReadTransactionDTO({
      id: {} as any,
    });

    const validation = await obj.validate();

    expect(validation).toHaveLength(1);
  });
});
