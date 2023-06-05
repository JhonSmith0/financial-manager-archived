import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import { accountRepositoryCommon } from "./AccountRepositoryCommon";

const memory = new AccountRepositoryInMemory();

describe("AccountRepository", () => {
  accountRepositoryCommon("InMemory", memory);
});
