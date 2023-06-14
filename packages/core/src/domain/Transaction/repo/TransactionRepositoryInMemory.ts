import { Query } from "@/common/Query";
import { handleQuery } from "@/common/repo/handleQuery";
import { TransactionProps } from "../types/TransactionProps";
import { TransactionRepository } from "../types/TransactionRepository";

export class TransactionRepositoryInMemory implements TransactionRepository {
  public async deleteByQuery<T extends TransactionProps>(
    query: Query<T>,
    limit: number = 0
  ): Promise<void> {
    if (limit === 0) limit = this.data.length;
    let accs = handleQuery(query, this.data, 0, limit);
    if (!Array.isArray(accs)) accs = [accs];
    await Promise.all(accs.map((e) => this.remove(e.id)));
  }
  public async update(
    id: string,
    data: Partial<TransactionProps>
  ): Promise<void> {
    const i = this.data.findIndex((obj) => obj.id === id);
    if (i < 0) return;

    const obj = this.data[i];

    Object.assign(obj, data);
  }
  public async remove(id: string): Promise<void> {
    this.data.splice(
      this.data.findIndex((obj) => obj.id === id),
      1
    );
  }
  public data: TransactionProps[] = [];

  findByQuery(
    query: Query<TransactionProps>,
    skip?: number | undefined,
    limit?: 1 | undefined
  ): Promise<void | TransactionProps>;
  findByQuery(
    query: Query<TransactionProps>,
    skip?: number | undefined,
    limit?: number | undefined
  ): Promise<TransactionProps[]>;
  public async findByQuery(
    query: any,
    skip: any = 0,
    limit: any = 1
  ): Promise<void | TransactionProps | TransactionProps[]> {
    return handleQuery(query, this.data, skip, limit);
  }
  public async add(data: TransactionProps): Promise<void> {
    this.data.push(data);
  }
}
