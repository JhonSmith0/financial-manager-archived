import { PrismaRepo } from "@/common/repo/PrismaRepo";

export default class UserRepository extends PrismaRepo {
	public db = this.user;
}

// if (unique) return await this.db.findUnique({ where: { [prop]: value } });
// return await this.db.findMany({ where: { [prop]: value } });
