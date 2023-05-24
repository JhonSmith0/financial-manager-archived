import { PrismaClient } from "@prisma/client";
import UserRepository from "../types/UserRepository";
import User from "../entity/User";
import UserProps from "../types/UserProps";

export default class UserRepositoryPrisma
  extends PrismaClient
  implements UserRepository
{
  private db = this.user;
  constructor() {
    super();
  }
  public async findByProp<T extends keyof UserProps>(
    prop: T,
    value: UserProps[T],
    unique: false
  ): Promise<UserProps[]>;
  public async findByProp<T extends keyof UserProps>(
    prop: T,
    value: UserProps[T],
    unique: true
  ): Promise<void | UserProps>;
  public async findByProp<T extends keyof UserProps>(
    prop: T,
    value: UserProps[T],
    unique: boolean
  ): Promise<UserProps | UserProps[] | void> {
    if (unique)
      return (await this.db.findUnique({ where: { [prop]: value } })) as any;
    return await this.db.findMany({ where: { [prop]: value } });
  }
  public async add(data: User): Promise<void> {
    await this.db.create({ data });
  }
  public async remove(id: string): Promise<void> {
    await this.db.delete({ where: { id } });
  }
  public async update(id: string, data: Partial<UserProps>): Promise<void> {
    await this.db.update({ where: { id }, data });
  }
}

// if (unique) return await this.db.findUnique({ where: { [prop]: value } });
// return await this.db.findMany({ where: { [prop]: value } });
