import { NestFactory } from "@nestjs/core";
import RootModule from "./modules/RootModule";

const PORT = 3000;

async function main() {
  const app = await NestFactory.create(RootModule);

  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}

main();
