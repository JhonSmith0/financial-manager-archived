import JWT from "@/common/JWT/JWT";
import NotFoundError from "@/common/errors/NotFoundError";
import ValidationError from "@/common/errors/ValidationError";
import LoginUserDTO from "@/domain/User/dto/LoginUserDTO";
import User from "@/domain/User/entity/User";
import UserRepository from "@/domain/User/types/UserRepository";
import { left, right } from "fp-ts/Either";

export default class LoginController {
  constructor(private repo: UserRepository, private jwt: JWT) {}

  public async handle(data: LoginUserDTO) {
    const errors = await data.validate();

    if (errors.length) return left(errors);

    const user = await this.repo.findByProp("email", data.email, true);
    if (!user)
      return left(new NotFoundError("Invalid data!", ["email", "password"]));

    const pass = await User.fromPlain(user).comparePassword(data.password);
    if (!pass)
      return left(
        new ValidationError("Invalid email or password", ["email", "password"])
      );

    return right(this.jwt.encode({ id: user.id }));
  }
}
