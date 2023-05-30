import User from "@/domain/User/entity/User";
import Account from "../entity";
import AccountProps from "./AccountProps";

export default interface AccountRepository {
  add(acc: Account): Promise<void>;
  remove(id: Account["id"]): Promise<void>;
  update(
    id: Account["id"],
    data: Omit<Partial<AccountProps>, "id">
  ): Promise<void>;

  exists(acc: AccountProps): Promise<boolean>;

  findByProp<T extends keyof AccountProps>(
    prop: T,
    value: AccountProps[T],
    unique: false
  ): Promise<AccountProps[]>;
  findByProp<T extends keyof AccountProps>(
    prop: T,
    value: AccountProps[T],
    unique: true
  ): Promise<AccountProps | void>;
  findByUserIdAndName(
    userId: User["id"],
    name: AccountProps["name"]
  ): Promise<AccountProps[]>;
}
