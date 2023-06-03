import { UseCase } from "@/common/UseCase";
import User from "@/domain/User/entity/User";
import UpdateAccountDTO from "../dto/UpdateAccountDTO";
import AccountRepository from "../types/AccountRepository";
import { left, right } from "fp-ts/lib/Either";
import AlreadyExistsError from "@/common/errors/AlreadyExistsError";
import NotFoundError from "@/common/errors/NotFoundError";

interface Props {
  dto: ClassProperties<UpdateAccountDTO>;
  user: { id: User["id"] };
}

export class UpdateAccountUseCase<T extends Props> extends UseCase<T> {
  constructor(private accountsRepo: AccountRepository) {
    super();
  }

  public async execute({ user, dto }: T) {
    //Verify if account with that id exists
    const accountById = await this.accountsRepo.findByQuery({
      id: { equals: dto.id },
    });

    if (!accountById)
      return left(
        new NotFoundError(`Account with id ${dto.id} not found!`, ["id"])
      );

    //Verify if account with that name already exists
    const exists = await this.accountsRepo.findByQuery({
      name: {
        equals: dto.name,
      },
      userId: {
        equals: user.id,
      },
      id: {
        equals: dto.id,
      },
    });

    if (exists)
      return left(new AlreadyExistsError("Account already exists!", ["name"]));

    await this.accountsRepo.update(dto.id, dto);

    return right({ ...accountById, ...dto });
  }
}
