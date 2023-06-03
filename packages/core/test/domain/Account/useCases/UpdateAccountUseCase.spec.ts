import AlreadyExistsError from "@/common/errors/AlreadyExistsError";
import NotFoundError from "@/common/errors/NotFoundError";
import UpdateAccountDTO from "@/domain/Account/dto/UpdateAccountDTO";
import Account from "@/domain/Account/entity";
import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import { UpdateAccountUseCase } from "@/domain/Account/useCases/UpdateAccountUseCase";

describe("UpdateAccountUseCase", () => {
  const repo = new AccountRepositoryInMemory();
  const useCase = new UpdateAccountUseCase(repo);

  //Try to update an account who doesnot exist
  it("should give not found error", async () => {
    const result = await useCase.execute({
      user: { id: "kjhjkhjk" },
      dto: {
        id: "hjkhkjh",
      },
    });

    const left = (result as any).left;

    expect(left).toBeInstanceOf(NotFoundError);
  });

  //Try to update an account but that will make it a duplicate
  it("should give already exists error", async () => {
    const acc = Account.create({
      description: "Test",
      name: "Hello!",
      userId: "389798",
    });

    await repo.add(acc);

    const result = await useCase.execute({
      dto: {
        id: acc.id,
        name: acc.name,
      },
      user: {
        id: acc.userId,
      },
    });

    expect((result as any).left).toBeInstanceOf(AlreadyExistsError);

    await repo.remove(acc.id);
  });

  it("should update and block id change", async () => {
    const acc = Account.create({
      description: "Test",
      name: "Hello!",
      userId: "389798",
    });

    await repo.add(acc);

    const dto = UpdateAccountDTO.create({
      id: acc.id,
      description: "updated desc",
      name: "updated name",
      userId: "baozinho",
    } as any);

    const result = await useCase.execute({
      dto,
      user: { id: acc.id },
    });

    const value = (result as any).right;

    expect(value).toMatchObject(dto);

    await repo.remove(acc.id);
  });
});
