import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import { accountRepositoryCommon } from "./AccountRepositoryCommon";

const repo = new AccountRepositoryInMemory();

describe("AccountRepository", () => {
  accountRepositoryCommon("InMemory", repo);
});

