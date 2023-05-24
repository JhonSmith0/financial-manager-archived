import { createApp } from '..';

async function main() {
  const app = await createApp();

  app.listen(3000);
}

main();
