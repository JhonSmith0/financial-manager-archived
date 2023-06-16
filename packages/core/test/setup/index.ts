import { loadEnv } from "@/utils/loadEnv";
import { PrismaClient } from "@prisma/client";
import { DeepMockProxy, mockReset } from "jest-mock-extended";
import { prisma } from "./client";

loadEnv("test");
