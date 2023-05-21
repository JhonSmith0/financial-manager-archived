import LoginUserDTO from "@/core/domain/User/dto/LoginUserDTO";

describe("LoginUserDTO", () => {
  const data = {
    email: "test@email.com",
    password: "12345678",
  };

  it("should pass on validation", async () => {
    expect(await LoginUserDTO.create(data).validate()).toHaveLength(0);
  });
  it("should give error on email", async () => {
    expect(
      await LoginUserDTO.create({ ...data, email: "jhonsemail.com" }).validate()
    ).toHaveLength(1);
  });
  it("should give error on password (too small)", async () => {
    expect(
      await LoginUserDTO.create({ ...data, password: "1".repeat(7) }).validate()
    ).toHaveLength(1);
  });
  it("should give error on password (too long)", async () => {
    expect(
      await LoginUserDTO.create({
        ...data,
        password: "1".repeat(257),
      }).validate()
    ).toHaveLength(1);
  });
});
