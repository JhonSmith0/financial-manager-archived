import { Transaction } from "@/domain/Transaction/entity";
import { TransactionRepositoryInMemory } from "@/domain/Transaction/repo/TransactionRepositoryInMemory";

describe("TransactionRepositoryInMemory", () => {
  const repo = new TransactionRepositoryInMemory();
  const tr = Transaction.create({
    amount: 100,
    description: "",
    fromAccountId: "1",
    toAccountId: "2",
    userId: '123'
  });

  //query
  //add
  it("should add a Transaction and make use of query system", async () => {
    await repo.add(tr);
    expect(await repo.findByQuery({ id: { equals: tr.id } })).toMatchObject(tr);
  });

  it("should update transaction", async () => {
    tr.amount = 200;
    await repo.update(tr.id, tr);
    expect(await repo.findByQuery({ id: { equals: tr.id } })).toMatchObject(tr);
  });
  it("should update remove transaction", async () => {
    await repo.remove(tr.id);
    expect(await repo.findByQuery({ id: { equals: tr.id } })).toBeFalsy()
  });
});
