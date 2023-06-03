import { PrismaClient } from "@prisma/client";

export class PrismaRepo extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
}
