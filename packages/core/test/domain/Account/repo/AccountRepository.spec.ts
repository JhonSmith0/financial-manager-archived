import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import { accountRepositoryCommon } from "./AccountRepositoryCommon";
import { AccountRepositoryPrisma } from "@/domain/Account/repo/AccountRepositoryPrisma";

const memory = new AccountRepositoryInMemory();
const prisma = new AccountRepositoryPrisma();

describe("AccountRepository", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  accountRepositoryCommon("InMemory", memory);
  accountRepositoryCommon("Prisma", prisma);
});
