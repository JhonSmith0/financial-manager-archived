import CreateUserDTO from "../dto/CreateUserDTO";
import User from "../entity/User";
import UserRepository from "../types/UserRepository";
import { left, right } from "fp-ts/Either";
import GenericError from "@/common/errors/GenericError";

export default class CreateUserUseCase {
  constructor(private repo: UserRepository) {}

  public async execute(data: CreateUserDTO) {
    // Already exists
    const exists = await this.repo.findByProp("email", data.email, true);
    if (exists)
      return left(new GenericError("This email is already in use!", 409));

    const user = await User.create(data);

    await this.repo.add(user);
    return right(user);
  }
}
