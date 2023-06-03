import Account from "@/domain/Account/entity";
import AccountRepository from "@/domain/Account/types/AccountRepository";

export function accountRepositoryCommon(name: string, repo: AccountRepository) {
  describe(`AccountRepository tests for ${name}`, () => {
    // add
    // remove
    it("should add remove an account", async () => {
      const acc = Account.create({
        description: "jkhjk",
        name: "kjhjkhkhjkjkh",
        userId: "ljljljkjlj",
      });

      await repo.add(acc);

      expect(await repo.findByQuery({ id: { equals: acc.id } })).toMatchObject(
        acc
      );

      await repo.remove(acc.id);
    });

    // update
    it("should update an account", async () => {
      const acc = Account.create({
        description: "jkhjk",
        name: "kjhjkhkhjkjkh",
        userId: "ljljljkjlj",
      });

      await repo.add(acc);

      const newAcc = { ...acc, name: "updated name" };

      await repo.update(acc.id, { name: newAcc.name });

      expect(await repo.findByQuery({ id: { equals: acc.id } })).toMatchObject(
        newAcc
      );

      await repo.remove(acc.id);
    });

    // exists
    it("should verify if account exists", async () => {
      const acc = Account.create({
        description: "jkhjk",
        name: "kjhjkhkhjkjkh",
        userId: "ljljljkjlj",
      });

      await repo.add(acc);

      expect(await repo.exists(acc)).toBeTruthy();
    });

    // findByQuery
    it("should find by query", async () => {
      const acc = Account.create({
        description: "jkhjk",
        name: "acc1",
        userId: "user1",
      });

      const acc2 = Account.create({
        description: "jkhjk",
        name: "acc2",
        userId: "user1",
      });

      const acc3 = Account.create({
        description: "jkhjk",
        name: "acc3",
        userId: "user2",
      });

      const acc4 = Account.create({
        description: "jkhjk",
        name: "ac4",
        userId: "user2",
      });

      await repo.add(acc);
      await repo.add(acc2);
      await repo.add(acc3);
      await repo.add(acc4);

      expect(
        await repo.findByQuery(
          {
            userId: {
              equals: acc.userId,
            },
          },
          0,
          2
        )
      ).toHaveLength(2);
      expect(
        await repo.findByQuery(
          {
            userId: {
              equals: acc3.userId,
            },
          },
          0,
          2
        )
      ).toHaveLength(2);
    });
  });
}
