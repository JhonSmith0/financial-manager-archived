import { Query } from "@/common/Query";
import { adaptQueryToPrisma } from "@/common/repo/adaptQueryToPrisma";
import { prismaFindByQuery } from "@/common/repo/prismaFindByQuery";
import { PrismaClient } from "@prisma/client";
import { TransactionProps } from "../types/TransactionProps";
import { TransactionRepository } from "../types/TransactionRepository";

export class TransactionRepositoryPrisma
  extends PrismaClient
  implements TransactionRepository
{
  public async deleteByQuery<T extends TransactionProps>(
    query: Query<T>,
    limit?: number | undefined
  ): Promise<void> {
    await this.db.deleteMany({
      where: adaptQueryToPrisma(query),
    });
  }
  private db = this.transaction;
  public async update(
    id: string,
    data: Partial<TransactionProps>
  ): Promise<void> {
    await this.db.update({ where: { id }, data });
  }
  public async remove(id: string): Promise<void> {
    await this.db.delete({ where: { id } });
  }
  findByQuery<T extends TransactionProps>(
    query: Query<T>,
    skip?: number | undefined,
    limit?: 1 | undefined
  ): Promise<void | TransactionProps>;
  findByQuery<T extends TransactionProps>(
    query: Query<T>,
    skip?: number | undefined,
    limit?: number | undefined
  ): Promise<TransactionProps[]>;
  public async findByQuery(
    query: any,
    skip: any = 0,
    limit: any = 100
  ): Promise<void | TransactionProps | TransactionProps[]> {
    return await prismaFindByQuery(query, limit, skip, this.db);
  }
  public async add(data: TransactionProps): Promise<void> {
    await this.db.create({ data });
  }
}
