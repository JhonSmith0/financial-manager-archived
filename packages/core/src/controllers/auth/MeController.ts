import Controller from "@/common/Controller";
import JWT from "@/common/JWT/JWT";
import GenericError from "@/common/errors/GenericError";
import SafeUserDTO from "@/domain/User/dto/SafeUser";
import UserRepository from "@/domain/User/types/UserRepository";

function ifCatch<T extends Function>(fn: T) {
  return <T extends Error>(newError: T) => {
    try {
      return fn();
    } catch (error) {
      console.log({ error });
      throw newError;
    }
  };
}

export default class MeController extends Controller<string> {
  constructor(private repo: UserRepository, private jwt: JWT) {
    super();
  }

  public async handle(jwt: string): Promise<any> {
    const verify = ifCatch(() => this.jwt.verify(jwt))(
      new GenericError("Invalid or expired token!", 403)
    );

    const decoded = ifCatch(() => this.jwt.decode(jwt))(
      new GenericError("Invalid token!", 403)
    ) as { id: string };

    const user = await this.repo.findByProp("id", decoded.id, true);
    if (!user) throw new GenericError("User dont exist!", 404);
    return SafeUserDTO.create(user);
  }
}
