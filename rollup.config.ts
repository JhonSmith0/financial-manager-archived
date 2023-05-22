import type { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import swc from "@rollup/plugin-swc";

export default {
  input: "src/application/server.ts",
  output: {
    dir: "dist",
    format: "cjs",
  },

  plugins: [
    typescript(),
    json(),
    commonjs(),
    resolve(),
    swc({
      swc: {
        minify: true,
        jsc: {
          target: "es5",
        },
      },
    }),
  ],
} as RollupOptions;
