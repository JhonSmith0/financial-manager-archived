import { PrismaClient } from "@prisma/client";
import Account from "../entity";
import AccountProps from "../types/AccountProps";
import AccountRepository from "../types/AccountRepository";

export class AccountRepositoryPrisma
  extends PrismaClient
  implements AccountRepository
{
  private db = this.account;
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
  findByProp<T extends keyof AccountProps>(
    prop: T,
    value: AccountProps[T],
    unique: false
  ): Promise<AccountProps[]>;
  findByProp<T extends keyof AccountProps>(
    prop: T,
    value: AccountProps[T],
    unique: true
  ): Promise<void | AccountProps>;
  async findByProp(
    prop: any,
    value: any,
    unique: any
  ): Promise<void | AccountProps | AccountProps[]> {
    if (unique) {
      return (await this.db.findUnique({
        where: {
          [prop]: value,
        },
      })) as any;
    }
    return await this.db.findMany({ where: { [prop]: value } });
  }
  findByUserIdAndName(userId: string, name: string): Promise<AccountProps[]> {
    throw new Error("Method not implemented.");
  }
}
