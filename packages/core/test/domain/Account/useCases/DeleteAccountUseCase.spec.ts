import NotFoundError from "@/common/errors/NotFoundError";
import Account from "@/domain/Account/entity";
import { AccountRepository } from "@/domain/Account/repo/AccountRepository";
import { DeleteAccountUseCase } from "@/domain/Account/useCases/DeleteAccountUseCase";
import { accountsForTests, usersForTests } from "../../../setup";
import UserRepository from "@/domain/User/repo/UserRepository";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";
import CreateAccountUseCase from "@/domain/Account/useCases/CreateAccountUseCase";

describe("DeleteAccountUseCase.spec", () => {
  const repo = new AccountRepository();
  const createUserUseCase = new CreateUserUseCase(new UserRepository());
  const deleteAccountUseCase = new DeleteAccountUseCase(repo);
  const createAccountUseCase = new CreateAccountUseCase(repo);

  const user = usersForTests[0]
  const account = accountsForTests[0]
  
  beforeAll(async () => {
	await createUserUseCase.execute(user)
	await createAccountUseCase.execute(account)
  })

  it("should give not found error", async () => {
    const result = await deleteAccountUseCase.execute({
		dto: {
			id: '1'
		} as any, 
		user
	});

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
  it("should remove", async () => {
    const result = await deleteAccountUseCase.execute({
      dto: account, 
      user
    });
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeFalsy();
  });
});

