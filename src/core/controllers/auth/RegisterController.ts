import JWT from "@/core/common/JWT/JWT";
import CreateUserDTO from "@/core/domain/User/dto/CreateUserDTO";
import CreateUserUseCase from "@/core/domain/User/useCases/CreateUserUseCase";
import { isLeft, left, right } from "fp-ts/Either";

export default class RegisterController {
  constructor(private createUserUseCase: CreateUserUseCase, private jwt: JWT) {}

  public async execute(data: CreateUserDTO) {
    const errors = await data.validate();

    if (errors.length) return left(errors);

    const user = await this.createUserUseCase.execute(data);
    if (isLeft(user)) return left(user.left);

    const token = this.jwt.encode({ id: user.right.id });
    return right(token);
  }
}
