import Controller from "@/common/Controller";
import JWT from "@/common/JWT/JWT";
import CreateUserDTO from "@/domain/User/dto/CreateUserDTO";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";
import { isLeft, left, right } from "fp-ts/Either";

export default class RegisterController extends Controller<CreateUserDTO, any> {
  constructor(private createUserUseCase: CreateUserUseCase, private jwt: JWT) {
    super();
  }

  public async handle(data: CreateUserDTO) {
    const errors = await data.validate();

    if (errors.length) return left(errors);

    const user = await this.createUserUseCase.execute(data);
    if (isLeft(user)) return left(user.left);

    const token = this.jwt.encode({ id: user.right.id });
    return right(token);
  }
}
