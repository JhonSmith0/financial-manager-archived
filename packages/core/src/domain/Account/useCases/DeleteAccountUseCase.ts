import { UseCase } from "@/common/UseCase";
import User from "@/domain/User/entity/User";
import { DeleteAccountDTO } from "../dto/DeleteAccountDTO";
import AccountRepository from "../types/AccountRepository";
import NotFoundError from "@/common/errors/NotFoundError";
import { left, right } from "@/common/ErrorHandlingTypes";

interface Prop {
  user: { id: User["id"] };
  dto: ClassProperties<DeleteAccountDTO>;
}

export class DeleteAccountUseCase extends UseCase<Prop> {
  constructor(private repo: AccountRepository) {
    super();
  }

  public async execute({ dto, user }: Prop) {
    const exists = await this.repo.findByQuery({
      id: {
        equals: dto.id,
      },
      userId: {
        equals: user.id,
      },
    });

    if (!exists)
      return left(
        new NotFoundError(`Account with id ${dto.id} dont exist!`, ["id"])
      );

    await this.repo.remove(dto.id);
    return right(null)
  }
}
