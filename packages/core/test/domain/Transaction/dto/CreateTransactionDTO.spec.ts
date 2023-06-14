import { CreateTransactionDTO } from "@/domain/Transaction/dto/CreateTransactionDTO";

describe("CreateTransactionDTO", () => {
  const data: ConstructorParameters<typeof CreateTransactionDTO>[0] = {
    amount: 100,
    fromAccountId: "1",
    toAccountId: "2",
  };

  it("should create a transaction", async () => {
    const obj = new CreateTransactionDTO(data);
    const validation = await obj.validate();

    expect(validation).toHaveLength(0);
    expect(obj).toMatchObject(data);
    expect(obj.date).toBeTruthy();
    expect(typeof obj.description).toBe("string");
  });

  it("should give invalid amount", async () => {
    const obj = new CreateTransactionDTO({ ...data, amount: -1 });
    const validation = await obj.validate();

    console.log({ validation });

    expect(validation).toHaveLength(1);
  });

  it("should give invalid desc", async () => {
    const obj = new CreateTransactionDTO({
      ...data,
      description: "a".repeat(129),
    });

    const validation = await obj.validate();

    expect(validation).toHaveLength(0);
    expect(obj.description).toBe("");
  });
  it("should give invalid date", async () => {
    const obj = new CreateTransactionDTO({
      ...data,
      date: "lhjjkfhjkhjkhjkhkf",
    });
    const validation = await obj.validate();

    expect(validation).toHaveLength(0);
    expect(typeof obj.date).toBe("string");
  });
  it("should pass on date", async () => {
    const obj = new CreateTransactionDTO({
      ...data,
      date: new Date().toString(),
    });
    const validation = await obj.validate();

    expect(validation).toHaveLength(0);
  });

  it("should give equal props error", async () => {
    const obj = await new CreateTransactionDTO({
      ...data,
      fromAccountId: data.toAccountId,
      toAccountId: data.toAccountId,
    }).validate();
    expect(obj.length).toBe(1);
  });
});
