import { PrismaClient } from "@prisma/client";

export class PrismaRepo extends PrismaClient {
  constructor() {
    super()
  }
}
