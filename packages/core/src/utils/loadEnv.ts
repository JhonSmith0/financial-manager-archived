import { config, parse } from "dotenv";
import { resolve } from "path";

function env(relative: string) {
  return resolve(__dirname, "../../", relative);
}

const strategy = {
  dev: env(".env.dev"),
  prod: env(".env.prod"),
  test: env(".env.test"),
};

export function loadEnv(type: keyof typeof strategy, override = true) {
  if (!(type in strategy)) throw new Error("Invalid env type!");

  return config({ path: strategy[type] });
}
