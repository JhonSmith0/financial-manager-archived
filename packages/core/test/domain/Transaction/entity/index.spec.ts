import { Transaction } from "@/domain/Transaction/entity";

describe("Transaction", () => {
  const data: Parameters<(typeof Transaction)["create"]>[0] = {
    amount: 10,
    description: "Hello!",
    fromAccountId: "1",
    toAccountId: "2",
  };

  it("should create a transaction", () => {
    const obj = Transaction.create(data);

    expect(obj).toMatchObject(data);
    expect(obj.date).toBeInstanceOf(Date);
    expect(typeof obj.id).toBe("string");
  });
});
