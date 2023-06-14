import User from "@/domain/User/entity/User";
import Account from "../entity";
import AccountProps from "./AccountProps";
import { Query } from "@/common/Query";
import { BasicRepository } from "@/common/repo/BasicRepository";

export default interface AccountRepository
  extends BasicRepository<
    AccountProps,
    AccountProps["id"],
    Partial<AccountProps>
  > {
  exists(data: AccountProps): Promise<boolean>;
}
