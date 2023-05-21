import JWT from "@/core/common/JWT/JWT";
import NotFoundError from "@/core/common/errors/NotFoundError";
import ValidationError from "@/core/common/errors/ValidationError";
import LoginUserDTO from "@/core/domain/User/dto/LoginUserDTO";
import User from "@/core/domain/User/entity/User";
import UserRepository from "@/core/domain/User/types/UserRepository";
import { left, right } from "fp-ts/Either";

export default class LoginController {
  constructor(private repo: UserRepository, private jwt: JWT) {}

  public async handle(data: LoginUserDTO) {
    const errors = await data.validate();

    if (errors.length) return left(errors);

    const user = await this.repo.findByProp("email", data.email, true);
    if (!user) return left(new NotFoundError("Invalid data!", ["email"]));

    const pass = await User.fromPlain(user).comparePassword(data.password);
    if (!pass) return left(new ValidationError("Invalid email or password"));

    return right(this.jwt.encode({ id: user.id }));
  }
}
