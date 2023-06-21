import { PrismaRepo } from "@/common/repo/PrismaRepo"

export class TransactionRepository extends PrismaRepo {
    public db = this.transaction
}
