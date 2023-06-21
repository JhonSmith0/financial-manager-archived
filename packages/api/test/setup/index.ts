import { registerPaths } from "../../src/registerPaths"
import { loadEnv } from "@financial/core/dist/utils/loadEnv"

loadEnv("test")

registerPaths()
