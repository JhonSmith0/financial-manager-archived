import AlreadyExistsError from "@/core/common/errors/AlreadyExistsError";
import CreateUserDTO from "../dto/CreateUserDTO";
import User from "../entity/User";
import UserRepository from "../types/UserRepository";
import { left, right } from "fp-ts/Either";

export default class CreateUserUseCase {
  constructor(public repo: UserRepository) {}

  public async execute(data: CreateUserDTO) {
    // Already exists
    const exists = await this.repo.findByProp("email", data.email, true);
    if (exists)
      return left(new AlreadyExistsError("Email Already exists", ["email"]));

    const user = await User.create(data);

    await this.repo.add(user);
    return right(user);
  }
}
