import { RepositoryInMemory } from "@/common/repo/RepositoryInMemory";
import { randomUUID } from "crypto";

class TestData {
  id: string = randomUUID();
}

class TestRepo extends RepositoryInMemory<TestData> {}

describe("RepositoryInMemory", () => {
  const repo = new TestRepo();

  afterEach(() => (repo.data = []));

  it("should add a data", async () => {
    const data = new TestData();
    await repo.add(data);

    expect(repo.data.length).toBe(1);
    expect(repo.data[0]).toMatchObject(data);
  });

  it("should remove data", async () => {
    const data = new TestData();
    await repo.add(data);

    await repo.remove(data.id);

    expect(repo.data.length).toBe(0);
  });
  it("should update data", async () => {
    const data = new TestData();
    await repo.add(data);

    const copy = { ...data };
    copy.id = "123";

    await repo.update(data.id, copy);

    expect(await repo.read("123")).toMatchObject(copy);
  });
  it("should read data", async () => {
    const data = new TestData();
    await repo.add(data);

    expect(await repo.read(data.id)).toMatchObject(data);
  });

  it("should find by query", async () => {
    const data = new TestData();
    await repo.add(data);

    expect(await repo.findByQuery({ id: { equals: data.id } })).toMatchObject(
      data
    );
  });
  it("should delete by query", async () => {
    const data = new TestData();
    await repo.add(data);
    await repo.deleteByQuery({ id: { equals: data.id } });

    expect(repo.data.length).toBe(0);
  });
});
