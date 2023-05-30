import Account from "@/domain/Account/entity";
import AccountProps from "@/domain/Account/types/AccountProps";
import AccountRepository from "@/domain/Account/types/AccountRepository";
import User from "@/domain/User/entity/User";
import { randomUUID } from "crypto";

export function accountRepositoryCommon(name: string, repo: AccountRepository) {
  describe(`AccountRepository tests for ${name}`, () => {
    let account: Account;
    let user: User;

    const user1 = "1234";
    const user2 = "12";

    beforeAll(async () => {
      user = await User.create(User.dataForTest);

      account = Account.create({
        description: "testing",
        name: "Hello!",
        userId: user.id,
      });

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

    it("should create an account", async () => {
      await repo.add(account);
      expect(await repo.findByProp("id", account.id, true)).toMatchObject(
        account
      );
    });
    it("should update the account", async () => {
      const newDescription = randomUUID();

      await repo.update(account.id, { description: newDescription });

      const found = (await repo.findByProp(
        "description",
        newDescription,
        true
      )) as AccountProps;

      expect(found.description).toBe(newDescription);
    });

    it("should remove the account ", async () => {
      await repo.remove(account.id);
      expect(await repo.findByProp("id", account.id, true)).toBeFalsy();
    });

    it("should match all the lenghts", async () => {});

    it("should pass", async () => {
      const proms = [
        await repo.findByUserIdAndName(user1, "account"),
        await repo.findByUserIdAndName(user2, "account"),
        await repo.findByUserIdAndName(user2, "john"),
      ];

      expect(proms[0]).toHaveLength(2);
      expect(proms[1]).toHaveLength(0);
      expect(proms[2]).toHaveLength(1);
    });
  });
}
