import { SearchAccountsController } from "@/controllers/accounts/SearchAccountsController";
import Account from "@/domain/Account/entity";
import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";

describe("SearchAccountsController", () => {
  const repo = new AccountRepositoryInMemory();
  const controller = new SearchAccountsController(repo);

  const user1 = "1234";
  const user2 = "12";

  beforeAll(async () => {
    await repo.add(
      Account.create({
        description: "hello",
        name: "Account1",
        userId: user1,
      })
    );
    await repo.add(
      Account.create({
        description: "hello",
        name: "Account2",
        userId: user1,
      })
    );
    await repo.add(
      Account.create({
        description: "hello",
        name: "test",
        userId: user2,
      })
    );
    await repo.add(
      Account.create({
        description: "hello",
        name: "john",
        userId: user2,
      })
    );
  });

  it("should pass", async () => {
    const proms = [
      await controller.handle({
        dto: { name: "account" },
        user: { id: user1 },
      }),
      await controller.handle({
        dto: { name: "account" },
        user: { id: user2 },
      }),
      await controller.handle({ dto: { name: "john" }, user: { id: user2 } }),
    ];

    expect(proms[0]).toHaveLength(2);
    expect(proms[1]).toHaveLength(0);
    expect(proms[2]).toHaveLength(1);
  });
});
