import { pathsToModuleNameMapper } from "ts-jest";
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
import { compilerOptions } from "./tsconfig.json";
import type { JestConfigWithTsJest } from "ts-jest";
import { Config } from "@swc/core";

const config: Config = {
	jsc: {
		parser: {
			syntax: "typescript",
			dynamicImport: false,
			decorators: true,
		},
		target: "es2022",
		loose: false,
		externalHelpers: false,
		keepClassNames: false,
	},
};

const jestConfig: JestConfigWithTsJest = {
	// [...]
	roots: ["<rootDir>"],
	preset: "ts-jest",
	modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
	moduleNameMapper: pathsToModuleNameMapper(
		compilerOptions.paths /*, { prefix: '<rootDir>/' } */
	),
	// setupFiles: ["./test/setup/index.ts"],

	transform: {
		"^.+\\.(t|j)sx?$": ["@swc/jest", config as any],
	},
	setupFilesAfterEnv: ["./test/setup/index.ts"],
};

export default jestConfig;
