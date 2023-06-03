import { Query } from "@/common/Query";
import { PrismaRepo } from "@/common/repo/PrismaRepo";
import Account from "../entity";
import AccountProps from "../types/AccountProps";
import AccountRepository from "../types/AccountRepository";

export class AccountRepositoryPrisma
  extends PrismaRepo
  implements AccountRepository
{
  constructor() {
    super();
  }
  findByQuery<T extends AccountProps>(
    query: Query<T>,
    skip?: number | undefined,
    limit?: 1 | undefined
  ): Promise<AccountProps>;
  findByQuery<T extends AccountProps>(
    query: Query<T>,
    skip?: number | undefined,
    limit?: number | undefined
  ): Promise<AccountProps[]>;
  public async findByQuery<T extends AccountProps>(
    query: Query<T>,
    skip: number = 0,
    limit: number = 1
  ): Promise<AccountProps | AccountProps[] | void> {
    if (limit === 1)
      return (await this.db.findFirst({
        where: query,
        skip,
        take: limit,
      })) as any;

    return (await this.db.findMany({ where: query, skip, take: limit })) as any;
  }

  public db = this.account;
  public async add(data: Account): Promise<void> {
    await this.db.create({ data });
  }
  public async remove(id: string): Promise<void> {
    await this.db.delete({ where: { id } });
  }
  public async update(
    id: string,
    data: Omit<Partial<AccountProps>, "id">
  ): Promise<void> {
    await this.db.update({ where: { id }, data });
  }
  public async exists(acc: AccountProps): Promise<boolean> {
    return !!(await this.db.findUnique({
      where: {
        name_userId: {
          name: acc.name,
          userId: acc.userId,
        },
      },
    }));
  }
}
