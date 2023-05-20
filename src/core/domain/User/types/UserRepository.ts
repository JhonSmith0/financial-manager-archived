import User from "../entity/User";
import UserProps from "./UserProps";

export default interface UserRepository {
  add(user: User): Promise<void>;
  remove(id: User["id"]): Promise<void>;
  update(id: User["id"], data: Partial<UserProps>): Promise<void>;
  findByProp<T extends keyof UserProps>(
    prop: T,
    value: UserProps[T],
    unique: false
  ): Promise<UserProps[]>;
  findByProp<T extends keyof UserProps>(
    prop: T,
    value: UserProps[T],
    unique: true
  ): Promise<UserProps | void>;
}
