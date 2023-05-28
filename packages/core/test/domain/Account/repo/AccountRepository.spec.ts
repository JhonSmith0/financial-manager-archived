import AccountRepositoryInMemory from "@/domain/Account/repo/AccountRepositoryInMemory";
import { accountRepositoryCommon } from "./AccountRepositoryCommon";

accountRepositoryCommon("InMemory", new AccountRepositoryInMemory());
