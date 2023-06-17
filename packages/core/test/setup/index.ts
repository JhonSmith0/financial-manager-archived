import { PrismaRepo } from "@/common/repo/PrismaRepo";
import { loadEnv } from "@/utils/loadEnv";



loadEnv("test");
beforeAll(async () => {

    const repo = new PrismaRepo();

    await repo.transaction.deleteMany()
    await repo.account.deleteMany()
    await repo.user.deleteMany()

})



