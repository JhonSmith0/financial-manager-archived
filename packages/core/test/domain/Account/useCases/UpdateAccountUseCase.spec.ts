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

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotFoundError);
  });

  //Try to update an account but that will make it a duplicate
  it("should give already exists error", async () => {
    const acc1 = Account.create({
      description: "Test",
      name: "Hello!",
      userId: "389798",
    });
    const acc2 = Account.create({
      description: "Test",
      name: "Hello2!",
      userId: "389798",
    });

    await repo.add(acc1);
    await repo.add(acc2);

    const result = await useCase.execute({
      dto: {
        id: acc2.id,
        name: acc1.name,
      },
      user: {
        id: acc2.userId,
      },
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(AlreadyExistsError);

    await repo.remove(acc1.id);
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

    

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toMatchObject(dto);

    await repo.remove(acc.id);
  });
});
