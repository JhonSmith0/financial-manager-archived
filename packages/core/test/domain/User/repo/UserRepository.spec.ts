import UserRepositoryInMemory from "@/domain/User/repo/UserRepositoryInMemory";
import UserRepositoryCommonTests from "./UserRepositoryCommonTests";

// UserRepositoryCommonTests(`Prisma`, new UserRepositoryPrisma());
UserRepositoryCommonTests(`InMemory`, new UserRepositoryInMemory());
