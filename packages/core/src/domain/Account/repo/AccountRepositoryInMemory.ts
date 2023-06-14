import { Query, handlerObj } from "@/common/Query";
import Account from "../entity";
import AccountProps from "../types/AccountProps";
import AccountRepository from "../types/AccountRepository";
import { handleQuery } from "@/common/repo/handleQuery";
import { RepositoryInMemory } from "@/common/repo/RepositoryInMemory";

export default class AccountRepositoryInMemory
  extends RepositoryInMemory<AccountProps>
  implements AccountRepository
{
  public async exists(acc: AccountProps): Promise<boolean> {
    return !!this.data.find((e) => {
      return (
        e.id === acc.id || (e.name === acc.name && e.userId === acc.userId)
      );
    });
  }
}

// export default class AccountRepositoryInMemory implements AccountRepository {
//   findByQuery<T extends AccountProps>(
//     query: Query<T>,
//     skip?: number | undefined,
//     limit?: 1 | undefined
//   ): Promise<void | AccountProps>;
//   findByQuery<T extends AccountProps>(
//     query: Query<T>,
//     skip?: number | undefined,
//     limit?: number | undefined
//   ): Promise<AccountProps[]>;
//   public async findByQuery<T extends AccountProps>(
//     query: Query<T>,
//     skip: number = 0,
//     limit: number = 1
//   ): Promise<void | AccountProps | AccountProps[]> {
//     return handleQuery(query, this.data as any, skip, limit);
//   }

//   private data: Account[] = [];

//   public async exists(acc: AccountProps): Promise<boolean> {
//     return !!this.data.find((e) => {
//       return (
//         e.id === acc.id || (e.name === acc.name && e.userId === acc.userId)
//       );
//     });
//   }

//   public async add(acc: Account): Promise<void> {
//     this.data.push(acc);
//   }
//   public async remove(id: string): Promise<void> {
//     this.data.splice(
//       this.data.findIndex((e) => e.id === id),
//       1
//     );
//   }
//   public async update(
//     id: string,
//     data: Omit<Partial<AccountProps>, "id">
//   ): Promise<void> {
//     const i = this.data.findIndex((e) => e.id === id);
//     this.data[i] = Account.linkProto({ ...this.data[i], ...data });
//   }

//   public async findByUserIdAndName(
//     userId: string,
//     name: string
//   ): Promise<AccountProps[]> {
//     return this.data.filter(
//       (data) =>
//         data.userId === userId &&
//         data.name.toLowerCase().startsWith(name.toLowerCase())
//     );
//   }
// }
