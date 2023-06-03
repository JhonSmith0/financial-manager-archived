import { createApp } from "..";
import { loadEnv } from "@financial/core/dist/utils/loadEnv";

async function main() {
  // Loads envs from core package
  loadEnv(process.env.NODE_ENV || "dev");
  const app = await createApp();

  app.listen(3000);
}

main();
