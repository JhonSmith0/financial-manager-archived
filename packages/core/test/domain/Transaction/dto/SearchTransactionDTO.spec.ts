import { SearchTransactionDTO } from "@/domain/Transaction/dto/SearchTransactionDTO";

describe("SearchTransactionDTO", () => {
  it("shuold give invalid page", async () => {
    const dto = new SearchTransactionDTO({
      page: {} as any,
    });

    expect(await dto.validate()).toHaveLength(1);
  });
  it("should pass", async () => {
    const dto = new SearchTransactionDTO({
      page: 1,
    });

    expect(await dto.validate()).toHaveLength(0);
    expect(dto).toHaveProperty("page");
  });
  it("should fill props", async () => {
    const dto = new SearchTransactionDTO({});

    expect(await dto.validate()).toHaveLength(0);
    expect(dto.page).toBe(1);
  });
});
