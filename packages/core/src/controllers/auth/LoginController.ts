import Controller from "@/common/Controller";
import { left, right } from "@/common/ErrorHandlingTypes";
import JWT from "@/common/JWT/JWT";
import GenericError from "@/common/errors/GenericError";
import LoginUserDTO from "@/domain/User/dto/LoginUserDTO";
import User from "@/domain/User/entity/User";
import UserRepository from "@/domain/User/repo/UserRepository";

const error = new GenericError("Invalid email or password!", 400);

export default class LoginController extends Controller<LoginUserDTO> {
	constructor(private repo: UserRepository, private jwt: JWT) {
		super();
	}

	public async handle(data: LoginUserDTO) {
		const errors = await data.validate();

		if (errors.length) return left(errors);

		const user = await this.repo.db.findUnique({
			where: {
				email: data.email,
			},
		});
		if (!user) return left(error);

		const pass = await User.fromPlain(user).comparePassword(data.password);

		if (!pass) return left(error);

		return right(this.jwt.encode({ id: user.id }));
	}
}
