import UserRepositoryPrisma from "@/core/domain/User/repo/UserRepositoryPrisma";
import UserRepositoryCommonTests from "./UserRepositoryCommonTests";

UserRepositoryCommonTests(`Prisma`, new UserRepositoryPrisma());
