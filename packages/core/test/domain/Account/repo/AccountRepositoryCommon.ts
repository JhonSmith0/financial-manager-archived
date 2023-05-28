import Account from "@/domain/Account/entity";
import AccountProps from "@/domain/Account/types/AccountProps";
import AccountRepository from "@/domain/Account/types/AccountRepository";
import User from "@/domain/User/entity/User";
import { randomUUID } from "crypto";

export function accountRepositoryCommon(name: string, repo: AccountRepository) {
  describe(`AccountRepository tests for ${name}`, () => {
    let account: Account;
    let user: User;

    beforeAll(async () => {
      user = await User.create(User.dataForTest);

      account = Account.create({
        description: "testing",
        name: "Hello!",
        userId: user.id,
      });
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
  });
}
