import JWT from "@financial/core/dist/common/JWT/JWT";
import UserToken from "@financial/core/dist/domain/User/di/UserTokens";
import User from "@financial/core/dist/domain/User/entity/User";
import UserRepository from "@financial/core/dist/domain/User/repo/UserRepository";
import {
  Injectable,
  NestMiddleware,
  Inject,
  ForbiddenException,
} from "@nestjs/common";
import { parse } from "cookie";
import { Request } from "express";

@Injectable()
export class VerifyJWT implements NestMiddleware {
  constructor(
    private jwt: JWT,
    @Inject(UserToken.userRepository)
    private repo: UserRepository
  ) {}

  async use(
    req: Request & { user?: User },
    res: any,
    next: (error?: any) => void
  ) {
    const error = new ForbiddenException("Invalid token!");

    const { authorization } = parse(req.headers.cookie ?? "");
    if (!authorization) throw error;

    let id: string;

    try {
      ({ id } = this.jwt.verify(authorization) as { id: string });
    } catch (error) {
      throw error;
    }

    //@ts-ignore (for some reason id is not being recognized as keyof UserProps)
    const user = (await this.repo.db.findUnique({where: {id}})) as UserProps;
    if (!user) throw error;

    req.user = User.fromPlain(user);
    next();
  }
}

