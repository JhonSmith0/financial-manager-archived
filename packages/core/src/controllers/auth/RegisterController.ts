import Controller from "@/common/Controller";
import { left, right } from "@/common/ErrorHandlingTypes";
import JWT from "@/common/JWT/JWT";
import CreateUserDTO from "@/domain/User/dto/CreateUserDTO";
import CreateUserUseCase from "@/domain/User/useCases/CreateUserUseCase";

export default class RegisterController extends Controller<CreateUserDTO, any> {
  constructor(private createUserUseCase: CreateUserUseCase, private jwt: JWT) {
    super();
  }

  public async handle(data: CreateUserDTO) {
    const errors = await data.validate();

    if (errors.length) return left(errors);

    const user = await this.createUserUseCase.execute(data);
    if (user.isLeft()) return left(user.value);

    const token = this.jwt.encode({ id: user.value.id });
    return right(token);
  }
}
