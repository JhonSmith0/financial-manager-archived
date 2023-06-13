import { SearchAccountDTO } from "@/domain/Account/dto/SearchAccountDTO";

describe("SearchAccountDTO", () => {
  const input = {
    name: "testing",
    description: "aaaaaaaaaaaaaaaaaaaaaaa",
  };

  it("should pass and remove extra prop", () => {
    const dto = SearchAccountDTO.create({ ...input, extra: "hello" } as any);

    expect(dto).toMatchObject(input);
    expect(dto).not.toHaveProperty("extra");
  });

  it("should fail due to invalid type", async () => {
    const dto = SearchAccountDTO.create({ ...input, name: {} } as any);
    const validation = await dto.validate();
    expect(validation.length).toBe(1);
  });

  it("should fill optional props", async () => {
    const dto = SearchAccountDTO.create({
      name: "123",
    });
    expect(dto.description).toBe('')
    expect(dto.page).toBe(1)
  });
});
