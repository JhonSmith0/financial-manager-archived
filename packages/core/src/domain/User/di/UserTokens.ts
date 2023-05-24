export default class UserToken {
  public static readonly userRepository = Symbol("UserRepository");
  public static readonly createUserUseCase = Symbol("createUserUseCase");
}
