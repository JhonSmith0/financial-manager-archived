import UserRepositoryPrisma from "@/domain/User/repo/UserRepositoryPrisma";
import UserRepositoryCommonTests from "./UserRepositoryCommonTests";
import UserRepositoryInMemory from "@/domain/User/repo/UserRepositoryInMemory";

// UserRepositoryCommonTests(`Prisma`, new UserRepositoryPrisma());
UserRepositoryCommonTests(`InMemory`, new UserRepositoryInMemory());
