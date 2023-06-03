import NotFoundError from "@/common/errors/NotFoundError";
import Account from "@/domain/Account/entity";
import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import { DeleteAccountUseCase } from "@/domain/Account/useCases/DeleteAccountUseCase";

describe("DeleteAccountUseCase.spec", () => {
  const repo = new AccountRepositoryInMemory();
  const useCase = new DeleteAccountUseCase(repo);

  it("should give not found error", async () => {
    const data = {
      dto: {
        id: "kjhjk",
      },
      user: {
        id: "kjhkjh",
      },
    };
    const result = await useCase.execute(data);

    expect((result as any).left).toBeInstanceOf(NotFoundError);
  });
  it("should remove", async () => {
    const acc = Account.create({
      description: "",
      name: "8979875",
      userId: "7289789",
    });

    await repo.add(acc);

    const result = await useCase.execute({
      dto: {
        id: acc.id,
      },
      user: {
        id: acc.userId,
      },
    });

    expect(result).toBeFalsy();
  });
});
