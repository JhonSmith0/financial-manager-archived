import { PrismaRepo } from "@/common/repo/PrismaRepo"

export class AccountRepository extends PrismaRepo {
    public db = this.account
}
