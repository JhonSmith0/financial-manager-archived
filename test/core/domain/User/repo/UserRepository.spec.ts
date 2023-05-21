import UserRepositoryPrisma from "@/core/domain/User/repo/UserRepositoryPrisma";
import UserRepositoryCommonTests from "./UserRepositoryCommonTests";
import UserRepositoryInMemory from "@/core/domain/User/repo/UserRepositoryInMemory";

UserRepositoryCommonTests(`Prisma`, new UserRepositoryPrisma());
UserRepositoryCommonTests(`InMemory`, new UserRepositoryInMemory());
