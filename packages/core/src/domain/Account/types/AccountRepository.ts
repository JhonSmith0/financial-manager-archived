import User from "@/domain/User/entity/User";
import Account from "../entity";
import AccountProps from "./AccountProps";
import { Query } from "@/common/Query";

export default interface AccountRepository {
  add(acc: Account): Promise<void>;
  remove(id: Account["id"]): Promise<void>;
  update(
    id: Account["id"],
    data: Omit<Partial<AccountProps>, "id">
  ): Promise<void>;

  exists(acc: AccountProps): Promise<boolean>;

  findByQuery<T extends AccountProps>(
    query: Query<T>,
    skip?: number,
    limit?: 1
  ): Promise<AccountProps | void>;
  findByQuery<T extends AccountProps>(
    query: Query<T>,
    skip?: number,
    limit?: number
  ): Promise<AccountProps[]>;
}
